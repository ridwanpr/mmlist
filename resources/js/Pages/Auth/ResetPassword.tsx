import AuthLayout from '../../Layouts/AuthLayout';
import AppHead from '../../Components/AppHead';
import type React from 'react';
import { useForm } from '@inertiajs/react';
import { resetPasswordAction } from '../../actions/App/Http/Controllers/AuthController';

interface Props {
  token: string;
  email: string;
}

const ResetPasswordForm = ({ token, email }: Props) => {
  const { data, setData, post, processing, errors } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    post(resetPasswordAction.url());
  };

  return (
    <>
      <AppHead title="Create New Password" meta="Create New Password" />

      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm lg:w-87.5">
          <div className="mb-5">
            <h1 className="text-text font-serif text-2xl font-bold">New Password</h1>
            <p className="text-text-muted mt-2 text-sm leading-6">
              Please input your new password below.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="text-text mb-2 text-sm font-medium">
                New password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                required={true}
                onChange={e => setData('password', e.target.value)}
                value={data.password}
                className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/70 w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
              />
              {errors.password && (
                <span className="mt-1 block text-xs text-red-500">{errors.password}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password_confirmation" className="text-text mb-2 text-sm font-medium">
                Cofirm password
              </label>
              <input
                name="password_confirmation"
                id="password_confirmation"
                type="password"
                placeholder="Minimum 6 characters"
                required={true}
                onChange={e => setData('password_confirmation', e.target.value)}
                value={data.password_confirmation}
                className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/70 w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
              />
              {errors.password && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.password_confirmation}
                </span>
              )}
            </div>
            <button className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75">
              {processing ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

ResetPasswordForm.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default ResetPasswordForm;
