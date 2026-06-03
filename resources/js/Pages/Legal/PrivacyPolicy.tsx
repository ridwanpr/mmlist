import React from 'react';

import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';
import { Link } from '@inertiajs/react';
import { index } from '../../actions/App/Http/Controllers/ContactController';

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
          <p className="text-text-muted text-sm">Last Updated: 4 June 2026</p>
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
              1. Information We Collect
            </h2>
            <p>
              We limit data collection to information necessary to provide core account
              functionalities, optimize platform design, and monitor application performance.
            </p>

            <h3 className="text-text mt-4 font-semibold">A. Information You Provide Directly</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-text">Account Information:</strong> To register an account,
                you must provide a unique username. Providing an email address is optional and used
                solely for account recovery purposes. Providing your birth date is optional and used
                solely to grant access to age-restricted content.
              </li>
              <li>
                <strong className="text-text">User Content:</strong> Any votes, watchlists, and
                community comments you submit across the database are stored and associated with
                your account profile.
              </li>
            </ul>

            <h3 className="text-text mt-4 font-semibold">B. Information Collected Automatically</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-text">Technical Logs and Performance Data:</strong> When you
                browse the platform, we automatically collect limited technical data to maintain
                site stability. This includes log records, internet protocol (IP) addresses, browser
                types, and system performance metrics used exclusively to assist with debugging and
                error resolution.
              </li>
              <li>
                <strong className="text-text">Usage and Analytics Data:</strong> With your
                permission, we collect aggregated information regarding traffic trends, user
                interaction pathways, and general engagement levels to help improve our overall user
                experience.
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
                recovery or password resets.
              </li>
              <li>
                To verify age eligibility for restricted media content using your optionally
                provided birth date.
              </li>
              <li>
                To compile and display aggregate crowdsourced trigger warning statistics for the
                community.
              </li>
              <li>
                To investigate system abnormalities, resolve software errors, and troubleshoot
                technical platform issues.
              </li>
              <li>
                To analyze user navigation patterns to optimize our interface layouts and features.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar technologies to manage user preferences and evaluate
              platform traffic. Analytics and behavioral tracking tools are only initialized after
              you explicitly grant consent via our cookie consent prompt. You may withdraw your
              consent at any time by clearing your browser cookies. Rejection or withdrawal of
              consent will not restrict your access to core platform functionalities, account
              authentication, or database voting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              4. Data Sharing and Disclosure
            </h2>
            <p>
              Mamorulist does not sell, rent, or trade your personal data, watchlists, or usage
              habits to third-party advertising or marketing networks. Information is processed by
              trusted third-party service providers who support our core operations (such as hosting
              infrastructure, performance diagnostics, and web analytics tools).
            </p>
            <p className="mt-2">
              Our third-party analytics partners may collect, aggregate, and use tracking data
              obtained through our platform in accordance with their own independent privacy
              policies and data processing terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              5. Data Retention and Deletion
            </h2>
            <p>
              All community contributions and profile information are retained for as long as our
              services remain active to preserve the structural consistency and historical integrity
              of the crowdsourced database. We store this information to provide ongoing platform
              features unless you explicitly request its removal.
            </p>
            <p className="mt-2">
              If you wish to delete your account or any associated data records, please visit our
              contact page to submit a manual deletion request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              6. Inquiries and Support
            </h2>
            <p>
              For any questions, data deletion requests, or general inquiries regarding your data
              privacy on our platform, please visit our contact page{' '}
              <Link href={index.url()} className="text-primary font-bold">
                here
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              7. Changes to This Privacy Policy
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
