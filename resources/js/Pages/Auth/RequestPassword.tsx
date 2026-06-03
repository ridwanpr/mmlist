import AuthLayout from '../../Layouts/AuthLayout';
import AppHead from '../../Components/AppHead';
import type React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { login } from '../../actions/App/Http/Controllers/AuthController';
import { requestPasswordAction } from '../../actions/App/Http/Controllers/AuthController';

interface FlashMessages {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

const RequestPassword = () => {
  const { data, setData, post } = useForm({ email: '' });

  // Read the flash data for this specific component
  const { flash } = usePage() as unknown as { flash: FlashMessages };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    post(requestPasswordAction.url());
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

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-text mb-2 text-sm font-medium">
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
            </div>
            {flash?.success ? (
              <button
                disabled
                className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
              >
                Email Sent
              </button>
            ) : (
              <button className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75">
                Submit
              </button>
            )}
          </form>
          <p className="text-text-muted mt-2 pt-1 text-center text-sm">
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
