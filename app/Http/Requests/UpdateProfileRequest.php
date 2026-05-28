<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'username' => ['required', 'string', 'min:3', 'max:255', Rule::unique('users')->ignore($userId)],
            'email' => ['nullable', 'string', 'email:dns', 'max:255', Rule::unique('users')->ignore($userId), 'disposable_email'],
            'birth_date' => ['nullable', 'date'],
            'show_nsfw' => [
                'boolean',
                $this->filled('birth_date') ? 'nullable' : 'declined'
            ],
            'current_password' => ['nullable', 'required_with:password', 'current_password'],
            'password' => ['nullable', 'string', 'min:6', 'max:255', 'confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'disposable_email' => 'Please use valid known email address provider',
            'show_nsfw.declined' => 'You must set your birth date to enable NSFW content.',
        ];
    }
}
