import { Link, router, usePage } from '@inertiajs/react';
import React, { useState, useRef } from 'react';
import { FaGoogle } from 'react-icons/fa';

import InputField from '../../Components/UI/InputField';
import AuthLayout from '../../Layouts/AuthLayout';
import AppHead from '../../Components/AppHead';
import Turnstile, { type TurnstileInstance } from '../../Components/Turnstile';
import { redirect as redirectGoogle } from '../../actions/App/Http/Controllers/Auth/GoogleController';
import { requestPassword } from '../../actions/App/Http/Controllers/AuthController';

interface RegisterFormState {
  username: string | null;
  email: string | null;
  name: string | null;
  password: string | null;
  password_confirmation: string | null;
  'cf-turnstile-response': string | null;
  [key: string]: string | null;
}

interface PageProps {
  routes: Record<string, string>;
  errors: Record<string, string>;
  turnstileSiteKey: string;
  turnstileEnabled: boolean;
  [key: string]: unknown;
}

const Register = () => {
  const { routes, errors, turnstileSiteKey, turnstileEnabled } = usePage<PageProps>().props;
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [values, setValues] = useState<RegisterFormState>({
    username: null,
    email: null,
    name: null,
    password: null,
    password_confirmation: null,
    'cf-turnstile-response': null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value,
    }));
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post('/register', values, {
      onError: () => {
        turnstileRef.current?.reset();
        setValues(prev => ({ ...prev, 'cf-turnstile-response': null }));
      },
    });
  };

  return (
    <>
      <AppHead
        title="Register"
        meta="Register for a Mamorulist account. Create your personalized anime watchlist, check content guide, and contribute to our community database."
      />
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm">
          <div className="mb-5">
            <h1 className="text-text font-serif text-2xl font-bold">Create your account</h1>
            <p className="text-text-muted mt-2 text-sm leading-6">
              Join{' '}
              <Link
                href={routes['home.index']}
                className="text-primary hover:text-primary-dark font-serif font-semibold transition-colors"
              >
                mamorulist
              </Link>{' '}
              and be part of a safer anime community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            <div>
              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Public display name"
                handleChange={handleChange}
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-red-500">{errors.name}</span>
              )}
            </div>

            <div>
              <InputField
                label="Username"
                name="username"
                type="text"
                placeholder="Account username (used for login)"
                handleChange={handleChange}
              />
              {errors.username && (
                <span className="mt-1 block text-xs text-red-500">{errors.username}</span>
              )}
            </div>

            <div>
              <InputField
                label="Email"
                name="email"
                type="text"
                placeholder="Optional (needed for account recovery)"
                handleChange={handleChange}
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-red-500">{errors.email}</span>
              )}
              <span className="text-text-muted mt-1 block text-xs tracking-tight italic">
                Entirely your choice.
              </span>
            </div>

            <div>
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                handleChange={handleChange}
              />
              {errors.password && (
                <span className="mt-1 block text-xs text-red-500">{errors.password}</span>
              )}
            </div>

            <div>
              <InputField
                label="Confirm password"
                name="password_confirmation"
                type="password"
                placeholder="Repeat your password"
                handleChange={handleChange}
              />
              {errors.password_confirmation && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.password_confirmation}
                </span>
              )}
              <div className="mt-1 text-right">
                <Link
                  href={requestPassword.url()}
                  prefetch={'click'}
                  className="text-primary hover:text-primary-dark text-xs font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {turnstileEnabled && (
              <div>
                <Turnstile
                  ref={turnstileRef}
                  siteKey={turnstileSiteKey}
                  onVerify={token =>
                    setValues(prev => ({ ...prev, 'cf-turnstile-response': token }))
                  }
                  onExpire={() => setValues(prev => ({ ...prev, 'cf-turnstile-response': null }))}
                />
                {errors['cf-turnstile-response'] && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errors['cf-turnstile-response']}
                  </span>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={turnstileEnabled && !values['cf-turnstile-response']}
              className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 my-3 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
            >
              {turnstileEnabled && !values['cf-turnstile-response']
                ? 'Verifying...'
                : 'Create account'}
            </button>

            <a
              href={redirectGoogle.url()}
              className="border-border bg-surface hover:bg-surface-alt text-text flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer"
            >
              <FaGoogle /> Continue with Google
            </a>

            <p className="text-text-muted mt-2 pt-1 text-center text-sm">
              Already have an account?{' '}
              <Link
                href={routes['login']}
                className="text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

Register.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default Register;
