import { Link, router, usePage } from '@inertiajs/react';
import React, { useState, useRef } from 'react';
import { FaGoogle } from 'react-icons/fa';

import InputField from '../../Components/UI/InputField';
import AuthLayout from '../../Layouts/AuthLayout';
import AppHead from '../../Components/AppHead';
import Turnstile, { type TurnstileInstance } from '../../Components/Turnstile';
import { redirect as redirectGoogle } from '../../actions/App/Http/Controllers/Auth/GoogleController';
import { requestPassword } from '../../actions/App/Http/Controllers/AuthController';

interface PageProps {
  routes: Record<string, string>;
  errors: Record<string, string>;
  turnstileSiteKey: string;
  turnstileEnabled: boolean;
  [key: string]: unknown;
}

const Login = () => {
  const { routes, errors, turnstileSiteKey, turnstileEnabled } = usePage<PageProps>().props;
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [values, setValues] = useState({
    username: '',
    password: '',
    'cf-turnstile-response': null as string | null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    router.post('/login', values, {
      onError: () => {
        turnstileRef.current?.reset();
        setValues(prev => ({ ...prev, 'cf-turnstile-response': null }));
      },
    });
  }

  return (
    <>
      <AppHead
        title="Login"
        meta="Log in to Mamorulist. Create your personalized anime watchlist, rate trigger warnings, and contribute to our community database."
      />
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm lg:w-87.5">
          <div className="mb-5">
            <h1 className="text-text font-serif text-2xl font-bold">Welcome back</h1>
            <p className="text-text-muted mt-2 text-sm leading-6">
              Log in to continue to{' '}
              <Link
                href={routes['home.index']}
                className="text-primary hover:text-primary-dark font-serif font-semibold transition-colors"
              >
                mamorulist
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <InputField
                label="Username"
                name="username"
                type="text"
                placeholder="Your username"
                handleChange={handleChange}
              />
              {errors.username && (
                <span className="mt-1 block text-xs text-red-500">{errors.username}</span>
              )}
            </div>

            <div>
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Your password"
                handleChange={handleChange}
              />
              {errors.password && (
                <span className="mt-1 block text-xs text-red-500">{errors.password}</span>
              )}
              <div className="mt-1 text-right">
                <Link
                  href={requestPassword.url()}
                  className="text-primary hover:text-primary-dark text-xs font-medium transition-colors hover:cursor-pointer"
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
              className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
            >
              {turnstileEnabled && !values['cf-turnstile-response'] ? 'Verifying...' : 'Log in'}
            </button>

            <a
              href={redirectGoogle.url()}
              className="border-border bg-surface hover:bg-surface-alt text-text flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer"
            >
              <FaGoogle /> Continue with Google
            </a>

            <p className="text-text-muted pt-1 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href={routes['auth.register']}
                className="text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

Login.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default Login;
