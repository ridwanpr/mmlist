<?php

namespace App\Services;

use Cache;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    public const FALLBACK_ADVISORY = 'Insufficient data to provide a reliable advisory.';

    private string $apiKey;

    private string $apiKey2;

    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';

    private string $systemInstruction;

    public function __construct()
    {
        $this->apiKey = config('app.gemini_api_key');
        $this->apiKey2 = config('app.gemini_api_key_2');

        // Aligned to column 0 to prevent PHP indentation compiler errors
        $this->systemInstruction = <<<'PROMPT'
        You are an anime expert media analyst specializing in content advisories and content triggers. Your output must be a strict JSON object matching the requested schema.

        <knowledge_rules>
        1. Base your advisory and trigger summaries on specific, reliable information available in this lineage order: exact installment, source material, then continuity lineage.
        2. Fallback Clause: Only set "ai_advisory" to exactly "Insufficient data to provide a reliable advisory." and return an empty array for "matched_triggers" if you cannot identify the anime at all. Partial knowledge is acceptable — write what you can confidently state about the anime's thematic content. Do not refuse or fall back simply because you are uncertain about specific minor details.
        3. Consistency Rule: If you have enough knowledge to populate any matched_triggers, you have enough knowledge to write an ai_advisory. Never produce matched_triggers with an empty or fallback ai_advisory.
        4. Rating Calibration: Accurately match the tone of your descriptions to the official age rating. For G/PG and Teen ratings, use measured, proportionate language — do not use alarmist or severe framing for content that is mild or age-appropriate by rating. For Mature/R ratings, do not soft-pedal or downplay severe themes. If the rating is unknown, calibrate based on the anime's known content and target demographic.
        </knowledge_rules>

        <output_constraints>
        Your entire response MUST be an unformatted, valid JSON string matching this structural schema precisely:
        {
        "ai_advisory": "A 3-4 sentence plain text paragraph (40-60 words total) evaluating overall thematic elements. No markdown formatting, bolding, or bullets.",
        "matched_triggers": [
            {
            "trigger_name": "The exact name string of the trigger as provided in the allowed list",
            "ai_summary": "A brief, 1-2 sentence objective context summary explaining how, when, or to what extent this specific trigger shows up in this anime."
            }
        ]
        }
        </output_constraints>

        <critical_restrictions>
        - You are strictly forbidden from including any markdown code block wrappers (do NOT wrap the output in triple backticks) or conversational commentary.
        - The keys "ai_advisory" and "matched_triggers" must exist.
        - "trigger_name" MUST perfectly match one of the string names provided in the user request. Do not invent your own category names.
        </critical_restrictions>
        PROMPT;
    }

    /**
     * Generate content advisory and localized trigger contexts.
     * 
     * @param array<string> $availableTriggers
     * @return array{ai_advisory: string, matched_triggers: array<array{trigger_name: string, ai_summary: string}>}
     */
    public function generateAnimeAdvisory(string $title, array $availableTriggers, ?string $rating = null): array
    {
        $ratingContext = $rating
            ? " Official Age Rating: {$rating}."
            : " Official Age Rating: Unknown — calibrate tone based on the anime's known content and target demographic.";

        // Pass the array of allowed triggers into the user prompt
        $triggerListStr = implode(", ", array_map(fn($t) => "'{$t}'", $availableTriggers));

        $prompt = "Provide the content advisory and itemized trigger breakdowns for the anime: {$title}.{$ratingContext}\n\n" .
            "CRITICAL: Evaluate the anime ONLY against these specific trigger names. If a trigger is present, add it to the matched_triggers array with context. If it isn't present, omit it from the array.\n" .
            "Allowed Trigger Names: [{$triggerListStr}]";

        $response = null;
        $key1CircuitOpen = Cache::get('gemini_key1_circuit_open', false);

        if ($key1CircuitOpen) {
            Log::info("Gemini key 1 circuit open — skipping directly to secondary key for {$title}.");
        } else {
            try {
                // Primary model call with key 1
                $response = $this->callApi('gemini-3.1-flash-lite', $prompt, timeout: 25);
            } catch (ConnectionException $e) {
                // Connection timeout is likely transient, short cooldown is enough
                Log::warning("Gemini main call timed out for {$title}. Opening key 1 circuit for 60 seconds.");
                Cache::put('gemini_key1_circuit_open', true, now()->addSeconds(60));
            }

            if ($response && $response->successful()) {
                return $this->parseJsonOutput($this->extractText($response->json()));
            }

            // Trip the circuit breaker on rate-limit or server error so subsequent
            // anime in this batch stop hitting key 1 altogether for a while
            if ($response && ($response->status() === 429 || $response->serverError())) {
                // 429 = daily quota exhausted (RPD), lock key 1 out until midnight when quota resets.
                // Server errors get a short cooldown since they are likely transient.
                $until = $response->status() === 429 ? now()->endOfDay() : now()->addSeconds(60);
                Log::warning("Gemini key 1 failed (Status: {$response->status()}) for {$title}. Opening circuit until {$until}.");
                Cache::put('gemini_key1_circuit_open', true, $until);
            }
        }

        // Key-2 retry: attempt same model with the secondary API key
        if ($key1CircuitOpen || ! $response || $response->status() === 429 || $response->serverError()) {
            $status = $response ? $response->status() : ($key1CircuitOpen ? 'Circuit Open' : 'Timeout');
            Log::warning("Gemini API unavailable (Status: {$status}) for {$title}. Retrying with secondary API key.");

            try {
                $key2Response = $this->callApi('gemini-3.1-flash-lite', $prompt, timeout: 25, apiKey: $this->apiKey2);

                if ($key2Response->successful()) {
                    return $this->parseJsonOutput($this->extractText($key2Response->json()));
                }

                Log::warning("Gemini secondary key also failed (Status: {$key2Response->status()}) for {$title}. Falling back to Gemma 4 31B.");
            } catch (ConnectionException $e) {
                Log::warning("Gemini secondary key timed out for {$title}. Falling back to Gemma 4 31B.");
            }

            // Final fallback: Gemma model with secondary key
            try {
                $fallbackResponse = $this->callApi('gemma-4-31b-it', $prompt, timeout: 60, apiKey: $this->apiKey2);

                if ($fallbackResponse->successful()) {
                    return $this->parseJsonOutput($this->extractText($fallbackResponse->json()));
                }
                Log::error("Gemma fallback failed for {$title}: " . $fallbackResponse->body());
            } catch (ConnectionException $e) {
                Log::error("Gemma fallback also timed out for {$title}.");
            }
        } else {
            Log::error("Gemini API failed for {$title}: " . $response->body());
        }

        throw new Exception('Failed to generate advisory after fallback.');
    }

    /**
     * Make HTTP request to the API gateway.
     */
    private function callApi(string $model, string $prompt, int $timeout = 30, ?string $apiKey = null): Response
    {
        $key = $apiKey ?? $this->apiKey;
        $url = "{$this->baseUrl}{$model}:generateContent?key={$key}";

        $generationConfig = [
            'temperature' => 0.2,
        ];

        // Apply Structured Outputs JSON Schema only to native Gemini models
        if (! str_starts_with($model, 'gemma-')) {
            $generationConfig['responseMimeType'] = 'application/json';
            $generationConfig['thinkingConfig'] = ['thinkingLevel' => 'minimal'];

            $generationConfig['responseSchema'] = [
                'type' => 'OBJECT',
                'properties' => [
                    'ai_advisory' => [
                        'type' => 'STRING',
                        'description' => 'A 3-4 sentence plain text paragraph evaluating overall thematic elements.'
                    ],
                    'matched_triggers' => [
                        'type' => 'ARRAY',
                        'items' => [
                            'type' => 'OBJECT',
                            'properties' => [
                                'trigger_name' => [
                                    'type' => 'STRING',
                                    'description' => 'The exact name string of the trigger provided in the allowed list.'
                                ],
                                'ai_summary' => [
                                    'type' => 'STRING',
                                    'description' => 'A brief, 1-2 sentence objective context summary explaining how this trigger shows up.'
                                ]
                            ],
                            'required' => ['trigger_name', 'ai_summary']
                        ]
                    ]
                ],
                'required' => ['ai_advisory', 'matched_triggers']
            ];
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
     * Extract raw text string from response payload blocks.
     */
    private function extractText(array $json): string
    {
        $parts = $json['candidates'][0]['content']['parts'] ?? [];
        if (empty($parts)) {
            return '';
        }

        $finalAnswer = '';
        foreach ($parts as $part) {
            if (isset($part['thought']) && $part['thought'] === true) {
                continue;
            }
            $finalAnswer .= $part['text'] ?? '';
        }

        return trim($finalAnswer);
    }

    /**
     * Clean up and decode raw text block into an structured array representation.
     * 
     * @return array{ai_advisory: string, matched_triggers: array<array{trigger_name: string, ai_summary: string}>}
     */
    private function parseJsonOutput(string $rawText): array
    {
        if (empty($rawText)) {
            return ['ai_advisory' => self::FALLBACK_ADVISORY, 'matched_triggers' => []];
        }

        // Clean out any accidental markdown wrapper artifacts if they leak from fallback models
        $cleaned = preg_replace('/^```json\s*|```$/m', '', $rawText);
        $decoded = json_decode(trim($cleaned), true);

        if (! is_array($decoded) || ! isset($decoded['ai_advisory'])) {
            Log::error("Failed to decode valid JSON content structural layout. Raw Output: " . $rawText);
            return ['ai_advisory' => self::FALLBACK_ADVISORY, 'matched_triggers' => []];
        }

        return [
            'ai_advisory' => $decoded['ai_advisory'],
            'matched_triggers' => $decoded['matched_triggers'] ?? []
        ];
    }
}
