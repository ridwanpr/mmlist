<?php

namespace App\Http\Requests;

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
    public function rules(): array
    {
        return [
            'airing' => ['nullable', Rule::in(['true'])],
            'sort'   => ['nullable', Rule::in(['score', 'title', 'year', 'episodes'])],
            'order'  => ['nullable', Rule::in(['asc', 'desc'])],
        ];
    }
}
