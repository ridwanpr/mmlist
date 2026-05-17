<?php

namespace App\Services;

use Gemini\Data\Content;
use Gemini\Laravel\Facades\Gemini;

class GeminiService
{
    public function generateAnimeAdvisory(string $title): string
    {
        $systemInstruction = <<<PROMPT
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

        $response = Gemini::generativeModel(model: 'gemini-3.1-flash-lite')
            ->withSystemInstruction(Content::parse($systemInstruction))
            ->generateContent("Provide the content advisory for anime: $title.");

        return $response->text();
    }
}
