<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'username' => ['required', 'string', 'min:3', 'max:255', Rule::unique('users')->ignore($userId)],
            'email' => ['nullable', 'string', 'email:dns', 'max:255', Rule::unique('users')->ignore($userId), 'disposable_email'],
            'birth_date' => ['nullable', 'date'],
            'show_nsfw' => ['boolean'],
            'current_password' => ['nullable', 'required_with:password', 'current_password'],
            'password' => ['nullable', 'string', 'min:6', 'max:255', 'confirmed'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (! $this->boolean('show_nsfw')) {
                return;
            }

            $birthDate = $this->input('birth_date');

            if (blank($birthDate)) {
                $validator->errors()->add(
                    'show_nsfw',
                    'You must add your birth date before enabling NSFW content.'
                );
                return;
            }

            if (Carbon::parse($birthDate)->age < 18) {
                $validator->errors()->add(
                    'show_nsfw',
                    'You must be at least 18 years old to enable NSFW content.'
                );
            }
        });
    }

    public function messages(): array
    {
        return [
            'disposable_email' => 'Please use valid known email address provider',
        ];
    }
}
