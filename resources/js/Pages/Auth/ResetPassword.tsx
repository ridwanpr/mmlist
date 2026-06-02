import AuthLayout from '../../Layouts/AuthLayout';
import AppHead from '../../Components/AppHead';
import type React from 'react';
import { Link } from '@inertiajs/react';
import InputField from '../../Components/UI/InputField';
import { login } from '../../actions/App/Http/Controllers/AuthController';

const ResetPassword = () => {
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
          <form>
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Your registered email address"
              handleChange={() => {}}
              required={true}
            />
            <button className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75">
              Submit
            </button>
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

ResetPassword.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default ResetPassword;
