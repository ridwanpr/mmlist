<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class VoteAnimeTriggerRequest extends FormRequest
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
            "appears" => ['required', Rule::in(['Yes', 'No'])],

            "severity" => [
                'exclude_if:appears,No',
                'required_if:appears,Yes',
                Rule::in(['Mild', 'Moderate', 'Severe', 'Extreme']),
            ],

            "framing" => [
                'exclude_if:appears,No',
                'required_if:appears,Yes',
                Rule::in(['Serious', 'Neutral', 'Romanticized', 'Comedic']),
            ],
        ];
    }
}
