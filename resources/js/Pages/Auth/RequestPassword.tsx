import AuthLayout from '../../Layouts/AuthLayout';
import AppHead from '../../Components/AppHead';
import React, { useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { login } from '../../actions/App/Http/Controllers/AuthController';
import { requestPasswordAction } from '../../actions/App/Http/Controllers/AuthController';
import Turnstile, { type TurnstileInstance } from '../../Components/Turnstile';

interface FlashMessages {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

interface PageProps {
  turnstileSiteKey: string;
  turnstileEnabled: boolean;
  [key: string]: unknown;
}

const RequestPassword = () => {
  const { turnstileSiteKey, turnstileEnabled } = usePage<PageProps>().props;
  const { flash } = usePage() as unknown as { flash: FlashMessages };

  const turnstileRef = useRef<TurnstileInstance>(null);

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    'cf-turnstile-response': null as string | null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(requestPasswordAction.url(), {
      preserveState: true,
      onError: () => {
        // Reset turnstile widget and local state if validation fails
        turnstileRef.current?.reset();
        setData('cf-turnstile-response', null);
      },
    });
  };

  return (
    <>
      <AppHead title="Reset Password" meta="Reset Password" />

      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm lg:w-87.5">
          <div className="mb-5">
            <h1 className="text-text font-serif text-2xl font-bold">Reset Password</h1>
            <p className="text-text-muted mt-2 text-sm leading-6">
              Enter your email address we&apos;ll send you a link to reset your password
            </p>
          </div>

          {flash?.success && (
            <div className="border-success/20 bg-success/10 text-success mb-5 rounded-xl border p-4 text-sm leading-relaxed">
              <span className="font-semibold">{flash.success}</span>
              <p className="text-text-muted mt-1 text-xs">
                If the email is registered, a recovery link will arrive shortly. Please check your
                spam or junk folder if you do not see it in your inbox.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-text mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Your registered email address"
                required={true}
                onChange={e => setData('email', e.target.value)}
                value={data.email}
                className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/70 w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-red-500">{errors.email}</span>
              )}
            </div>

            {turnstileEnabled && (
              <div>
                <Turnstile
                  ref={turnstileRef}
                  siteKey={turnstileSiteKey}
                  onVerify={token => setData('cf-turnstile-response', token)}
                  onExpire={() => setData('cf-turnstile-response', null)}
                />
                {errors['cf-turnstile-response'] && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errors['cf-turnstile-response']}
                  </span>
                )}
              </div>
            )}

            {flash?.success ? (
              <button
                disabled
                type="button"
                className="bg-primary text-surface mt-2 w-full rounded-lg px-4 py-2.5 text-sm font-semibold opacity-75 disabled:cursor-not-allowed"
              >
                Email Sent
              </button>
            ) : (
              <button
                type="submit"
                disabled={processing || (turnstileEnabled && !data['cf-turnstile-response'])}
                className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 mt-2 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
              >
                {processing
                  ? 'Processing...'
                  : turnstileEnabled && !data['cf-turnstile-response']
                    ? 'Verifying...'
                    : 'Submit'}
              </button>
            )}
          </form>

          <p className="text-text-muted mt-4 pt-1 text-center text-sm">
            Already have an account?{' '}
            <Link
              href={login.url()}
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

RequestPassword.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default RequestPassword;
