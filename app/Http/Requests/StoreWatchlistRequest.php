<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreWatchlistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (Auth::user()) {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'animeId' => ['required', 'exists:animes,mal_id'],
            'userId' => ['required'],
            'status' => ['required', Rule::in(['planned', 'watching', 'on_hold', 'completed', 'dropped'])],
            'progress' => ['nullable', 'numeric'],
            'score' => ['nullable', 'numeric', 'min:1', 'max:10'],
            'note' => ['nullable', 'string']
        ];
    }
}
