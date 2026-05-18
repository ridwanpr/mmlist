<?php

namespace App\Http\Requests;

use App\Services\MasterService;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BrowseAnimeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(MasterService $masterService): array
    {
        return [
            'airing' => ['nullable', Rule::in(['true', 'false'])],
            'upcoming' => ['nullable', Rule::in(['true', 'false'])],
            'sort' => ['nullable', Rule::in(['score', 'title', 'year', 'episodes'])],
            'order' => ['nullable', Rule::in(['asc', 'desc'])],
            'query' => ['nullable', 'string', 'max:100'],
            'genres' => ['nullable'],
            'themes' => ['nullable'],
            'seasons' => ['nullable', 'exists:animes,season'],
            'types' => ['nullable', 'exists:animes,type'],
            'years' => ['nullable', 'exists:animes,year'],
            'rating' => ['nullable', 'exists:animes,rating'],
        ];
    }
}
