import React from 'react';
import { Link } from '@inertiajs/react';

interface ErrorProps {
  status: number;
}

interface ErrorContent {
  title: string;
  description: string;
}

export default function Error({ status }: ErrorProps) {
  const errorDetails: Record<number, ErrorContent> = {
    403: {
      title: '403: Access Denied',
      description: 'You do not have the required permissions to access this resource.',
    },
    404: {
      title: '404: Page Not Found',
      description: 'The page you are looking for does not exist or has been relocated.',
    },
    500: {
      title: '500: Server Error',
      description:
        'An unexpected internal error occurred on our server. Our team has been notified, and we are actively working to resolve this shortly.',
    },
    503: {
      title: '503: Service Unavailable',
      description: 'We are currently offline for scheduled maintenance. Please check back shortly.',
    },
  };

  const currentError: ErrorContent = errorDetails[status] || {
    title: `${status || 'Error'}`,
    description: 'An unexpected application error has occurred.',
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6 py-12 font-sans transition-colors duration-200">
      <div className="border-border bg-surface w-full max-w-md rounded-2xl border p-8 shadow-sm transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-text font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {currentError.title}
          </h1>
          <p className="text-text-muted mt-4 text-base leading-relaxed">
            {currentError.description}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="bg-primary text-surface hover:bg-primary-dark focus:ring-accent-gold dark:text-background inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
