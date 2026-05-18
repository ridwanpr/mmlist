<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string|bool $apiKey;

    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';

    private string $systemInstruction;

    public function __construct()
    {
        $this->apiKey = config('gemini_api_key');

        $this->systemInstruction = <<<'PROMPT'
        You are an anime expert media analyst specializing in content advisories.

        KNOWLEDGE RULES:
        1. Base your advisory on the most specific reliable information available, in this order: the exact anime installment, then its direct source material, then broader franchise sources only if they belong to the same continuity and adaptation lineage. Do not infer content from genre or title alone.
        2. If the anime does not exist or you still lack reliable content knowledge after checking the exact installment and any allowed franchise sources, output exactly: "Insufficient data to provide a reliable advisory." Nothing else.
        3. Franchise Generalization: If a specific season or film is requested, use that installment's source material first. If specific information is unavailable, fall back only to broader franchise sources that clearly apply to the same continuity. Do not import themes, scenes, or content from unrelated arcs, spin-offs, alternate continuities, or different adaptations.
        4. Rating Calibration: If an official age rating is provided, adjust your language as follows:
           - G / PG / All Ages: use neutral, matter-of-fact language; avoid alarming descriptors.
           - PG-13 / Teen: use clear but measured language; name mature themes directly without dramatizing them.
           - R / Mature / 17+: use precise, frank language; do not soften or omit significant content warnings.
           If no rating is provided, use objective, descriptive language only.

        OUTPUT RULES:
        1. Your entire response must be one plain-text paragraph. No introduction, no title header, no sign-off, no commentary before or after.
        2. Do not use markdown, bullet points, bold, italics, or any other formatting.
        3. The paragraph must be exactly 3 to 4 sentences and between 40 and 60 words. Prioritize naturalness; do not pad or truncate sentences solely to hit the word count.
        4. Describe only themes, conflicts, and visual elements actually present in the anime. Do not speculate or generalize from genre conventions.
        5. Do not mention, quote, or allude to the official age rating in your output.
        6. Do not explain your reasoning, show drafts, count words aloud, or include any text that is not the final advisory paragraph.

        CORRECT OUTPUT EXAMPLES:
        Spy x Family is a wholesome action-comedy with a lighthearted tone. It features espionage, mild cartoon violence, and occasional gunfire, though the action sequences are highly stylized. The narrative focuses primarily on found family dynamics and humorous misunderstandings, making it highly accessible.

        K-On! is a slice-of-life comedy focused on friendship and music. The story centers around high school club activities, daily teenage struggles, and personal growth. The narrative remains deeply positive, prioritizing comedic character interactions and musical performances over external conflict.
        PROMPT;
    }

    public function generateAnimeAdvisory(string $title, ?string $rating = null): string
    {
        $ratingContext = $rating ? " Official Age Rating: {$rating}." : '';
        $prompt = "Provide the content advisory for anime: {$title}.{$ratingContext}";
        $response = null;

        try {
            // Gemini 3.1 Flash Lite (Primary)
            $response = $this->callApi('gemini-3.1-flash-lite', $prompt, timeout: 20);
        } catch (ConnectionException $e) {
            Log::warning("Gemini main call timed out for {$title}.");
        }

        if ($response && $response->successful()) {
            return $this->extractText($response->json());
        }

        if (! $response || $response->status() === 429 || $response->serverError()) {
            $status = $response ? $response->status() : 'Timeout';
            Log::warning("Gemini API unavailable (Status: {$status}) for {$title}. Falling back to Gemma 4 31B.");

            try {
                // Gemma 4 31B (Fallback)
                $fallbackResponse = $this->callApi('gemma-4-31b-it', $prompt, timeout: 60);

                if ($fallbackResponse->successful()) {
                    return $this->extractText($fallbackResponse->json());
                }

                Log::error("Gemma fallback failed for {$title}: ".$fallbackResponse->body());
            } catch (ConnectionException $e) {
                Log::error("Gemma fallback also timed out for {$title}.");
            }
        } else {
            Log::error("Gemini API failed for {$title}: ".$response->body());
        }

        throw new Exception('Failed to generate advisory after fallback.');
    }

    private function callApi(string $model, string $prompt, int $timeout = 30): Response
    {
        if (! $this->apiKey) {
            throw new Exception('GEMINI API KEY NOT SET');
        }

        $url = "{$this->baseUrl}{$model}:generateContent?key={$this->apiKey}";

        $generationConfig = ['temperature' => 1.0];

        if (! str_starts_with($model, 'gemma-')) {
            $generationConfig['thinkingConfig'] = ['thinkingLevel' => 'minimal'];
        }

        $payload = [
            'systemInstruction' => [
                'parts' => [['text' => $this->systemInstruction]],
            ],
            'contents' => [
                ['role' => 'user', 'parts' => [['text' => $prompt]]],
            ],
            'generationConfig' => $generationConfig,
        ];

        return Http::timeout($timeout)->post($url, $payload);
    }

    /**
     * @param  array<int|string, mixed>  $json
     */
    private function extractText(array $json): string
    {
        $parts = $json['candidates'][0]['content']['parts'] ?? [];

        if (empty($parts)) {
            return 'Insufficient data to provide a reliable advisory.';
        }

        $finalAnswer = '';

        foreach ($parts as $part) {
            if (isset($part['thought']) && $part['thought'] === true) {
                continue;
            }

            $finalAnswer .= $part['text'] ?? '';
        }

        return trim($finalAnswer) ?: 'Insufficient data to provide a reliable advisory.';
    }
}
