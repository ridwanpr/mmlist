<?php

namespace App\Http\Requests;

use App\Rules\Turnstile;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|min:3|max:255',
            'username' => 'required|min:3|max:255|alpha_num|unique:users,username',
            'email' => 'nullable|email:dns|min:3|max:255|unique:users,email|disposable_email',
            'password' => 'required|confirmed:password_confirmation|min:5|max:255',
            'cf-turnstile-response' => app()->environment('local') ? ['nullable'] : ['required', new Turnstile],
        ];
    }

    public function messages(): array
    {
        return [
            'disposable_email' => 'Please use valid known email address provider',
        ];
    }
}
