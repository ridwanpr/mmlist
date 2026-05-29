import React from 'react';

import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';

const PrivacyPolicy = () => {
  return (
    <>
      <AppHead
        title="Privacy Policy - Mamorulist"
        meta="Privacy Policy for Mamorulist, the community-driven anime trigger warning database. Learn how we handle your data, watchlists, and community contributions."
      />

      <div className="selection:bg-primary-soft selection:text-primary mx-auto max-w-3xl px-4 py-12 font-sans">
        <header className="border-border mb-12 border-b pb-6">
          <h1 className="text-text mb-2 font-serif text-4xl font-bold">Privacy Policy</h1>
          <p className="text-text-muted text-sm">Last Updated: May 2026</p>
        </header>

        <div className="text-text space-y-8 leading-relaxed">
          <section>
            <p>
              Mamorulist (mamorulist.com) operates a community-driven anime trigger warning
              database. This Privacy Policy describes the types of information we collect, how we
              use that information, and your choices regarding your data when you utilize our
              platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              1. Information Collection
            </h2>
            <p>
              We limit data collection to information necessary to provide core account
              functionalities and to monitor general application performance. This occurs via two
              methods:
            </p>

            <h3 className="text-text mt-4 font-semibold">A. Information You Provide Directly</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-text">Account Credentials:</strong> To register an account,
                manage a personal watchlist, vote on warning metrics, or submit comments, you must
                provide a unique username. Providing an email address is completely optional.
              </li>
              <li>
                <strong className="text-text">User Content:</strong> Any votes, safety flags, and
                community comments you submit across the database are stored and associated with
                your account profile.
              </li>
            </ul>

            <h3 className="text-text mt-4 font-semibold">B. Information Collected Automatically</h3>
            <p>
              When you browse the platform, we utilize third-party integrations that automatically
              collect limited technical indicators to ensure site stability and analyze traffic
              trends:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-text">Diagnostics and Error Logging:</strong> We use Sentry
                to capture runtime software errors and performance metrics. When an exception
                occurs, this service collects technical logs, network IP addresses, request headers,
                stack traces, and your associated account identifiers to assist with debugging.
              </li>
              <li>
                <strong className="text-text">Web Analytics:</strong> We use Google Analytics to
                monitor general traffic trends, aggregated user behavior, and platform engagement
                levels via internet cookies.
              </li>
              <li>
                <strong className="text-text">Behavioral Analytics:</strong> We use Microsoft
                Clarity to evaluate user interactions such as clicks, scrolls, and navigation
                pathways to optimize our overall layout design.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">2. Use of Information</h2>
            <p>
              We process the data we collect strictly for the following operational and platform
              improvement purposes:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                To manage user accounts, authenticate secure sessions, and facilitate account
                recovery or password resets for users who choose to provide an optional email
                address.
              </li>
              <li>
                To compile and display aggregate crowdsourced trigger warning statistics for the
                community.
              </li>
              <li>
                To investigate server-side abnormalities, resolve software bugs, and troubleshoot
                user-specific runtime errors.
              </li>
              <li>
                To analyze broad engagement metrics to help guide future user interface
                enhancements.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              3. Data Sharing and Transfers
            </h2>
            <p>
              Mamorulist does not sell, rent, or trade your personal data, watchlists, or usage
              habits to third-party advertising or marketing networks. Information is processed
              exclusively via our cloud hosting infrastructure and the specific diagnostics and
              analytics vendors explicitly listed in Section 1.
            </p>
            <p className="mt-2">
              All automated data processing is handled in accordance with the standard commercial
              service terms, privacy rules, and data transmission guidelines established by Google,
              Microsoft, and Sentry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              4. User Choices and Opt-Out Rights
            </h2>
            <p>
              You maintain full authority over background analytics tracking cookies. You can manage
              or completely disable the deployment of third-party analytics and logging cookies at
              any time by configuring your personal web browser tracking preferences or utilizing
              standard browser content-blocking mechanisms. Restricting tracking cookies will not
              degrade your access to core platform functions, account authentication, or trigger
              voting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              5. Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time. Any changes
              will become effective immediately upon posting to this page. Your continued use of the
              platform following the posting of any modifications constitutes your acceptance of
              those changes.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

PrivacyPolicy.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default PrivacyPolicy;
