<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $apiKey;
    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';
    private string $systemInstruction;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));

        $this->systemInstruction = <<<PROMPT
        You are an anime expert media analyst. Your task is to provide a single paragraph content advisory and trigger warning summary for the requested anime.

        CRITICAL KNOWLEDGE GUIDelines:
        1. Use your training knowledge of the anime's source material, manga, light novel, wiki, and reviews to identify accurate content warnings. Do NOT rely on genre or title alone.
        2. The Escape Hatch: If the anime does not exist, or if you cannot find reliable information about its content, do not guess. Reply exactly with: "Insufficient data to provide a reliable advisory."
        3. Franchise Generalization: If the user requests a specific season or movie (e.g., "Dan Da Dan Season 3") and you lack data for that specific release, DO NOT use the escape hatch immediately. Instead, base your advisory on the general source material for that franchise (e.g., the overarching "Dan Da Dan" manga).

        STRICT FORMATTING & OUTPUT RULES:
        1. Output only the final summary paragraph. Do not include introductory text, headers, greetings, endings, or conversational filler.
        2. Do not use any markdown formatting, bullet points, lists, or bold text. Output purely as straight, plain text.
        3. Length: The paragraph must be exactly 3 to 4 sentences (roughly 40 to 60 words).
        4. Spoiler-Free: Describe the sensitive themes and graphic elements without revealing plot twists or story outcomes.

        EXAMPLE OF CORRECT OUTPUT FORMAT:
        Spy x Family is a wholesome action-comedy with a lighthearted and comedic tone. While it features espionage, mild cartoon violence, and occasional gunfire, the graphic elements are highly sanitized and bloodless. There are no severe sensitive themes, making it generally safe and accessible for a wide audience.
        PROMPT;
    }

    public function generateAnimeAdvisory(string $title): string
    {
        $prompt = "Provide the content advisory for anime: $title.";

        // Attempt 1: Gemini 3.1 Flash Lite (Main)
        $response = $this->callApi('gemini-3.1-flash-lite', $prompt);

        if ($response->successful()) {
            return $this->extractText($response->json());
        }

        // Check if the failure was a rate limit (HTTP 429)
        if ($response->status() === 429) {
            Log::warning("Gemini rate limit hit for {$title}. Falling back to Gemma 4 31B.");

            // Attempt 2: Gemma 4 31B (Fallback)
            $fallbackResponse = $this->callApi('gemma-4-31b-it', $prompt);

            if ($fallbackResponse->successful()) {
                return $this->extractText($fallbackResponse->json());
            }

            Log::error("Gemma fallback failed for {$title}: " . $fallbackResponse->body());
        } else {
            Log::error("Gemini API failed for {$title}: " . $response->body());
        }

        throw new \Exception("Failed to generate advisory after fallback.");
    }

    /**
     * Executes the HTTP request to the Google Generative Language API.
     */
    private function callApi(string $model, string $prompt)
    {
        $url = "{$this->baseUrl}{$model}:generateContent?key={$this->apiKey}";

        return Http::timeout(30)->post($url, [
            'systemInstruction' => [
                'parts' => [
                    ['text' => $this->systemInstruction]
                ]
            ],
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 1.0,
            ]
        ]);
    }

    /**
     * Parses the deep JSON response to extract just the generated text.
     */
    private function extractText(array $json): string
    {
        return $json['candidates'][0]['content']['parts'][0]['text'] ?? 'Insufficient data to provide a reliable advisory.';
    }
}
