import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

import AuthLayout from '../../Layouts/AuthLayout';
import AppHead from '../../Components/AppHead';
import { redirect as redirectGoogle } from '../../actions/App/Http/Controllers/Auth/GoogleController';

interface PageProps {
  routes: Record<string, string>;
  [key: string]: unknown;
}

const Register = () => {
  const { routes } = usePage<PageProps>().props;

  return (
    <>
      <AppHead
        title="Register"
        meta="Register for a Mamorulist account using Google. Create your personalized anime watchlist, check content guide, and contribute to our community database."
      />
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm">
          <div className="mb-6">
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

          <div className="space-y-4">
            <a
              href={redirectGoogle.url()}
              className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none"
            >
              <FaGoogle /> Continue with Google
            </a>

            <p className="text-text-muted mt-4 pt-1 text-center text-sm">
              Already have an account?{' '}
              <Link
                href={routes['login']}
                className="text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Register.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default Register;
