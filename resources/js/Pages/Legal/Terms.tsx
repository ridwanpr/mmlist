import React from 'react';

import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';

const TermsOfService = () => {
  return (
    <>
      <AppHead
        title="Terms of Service - Mamorulist"
        meta="Terms of Service for Mamorulist. Understand your rights and responsibilities when contributing to our community-driven anime trigger warning database."
      />

      <div className="selection:bg-primary-soft selection:text-primary mx-auto max-w-3xl px-4 py-12 font-sans">
        <header className="border-border mb-12 border-b pb-6">
          <h1 className="text-text mb-2 font-serif text-4xl font-bold">Terms of Service</h1>
          <p className="text-text-muted text-sm">Last Updated: 30 May 2026</p>
        </header>

        <div className="text-text space-y-8 leading-relaxed">
          <section>
            <p>
              Welcome to Mamorulist (mamorulist.com). By accessing or using our platform, you agree
              to be bound by these Terms of Service. If you do not agree to these terms, please do
              not use the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              1. User Accounts and Content
            </h2>
            <p>
              To participate in certain community features, such as voting on metrics, flagging
              content, managing watchlists, or posting comments, you must create an account.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You are responsible for maintaining the confidentiality of your account credentials.
              </li>
              <li>
                Providing an email address is optional and is used exclusively for account recovery.
                If you choose not to provide an email address, we cannot reset your password if
                lost.
              </li>
              <li>
                Providing your birth date is optional and is used solely to verify age eligibility
                for restricted or mature database content.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              2. Community Contributions and License
            </h2>
            <p>
              Mamorulist relies on user-submitted data. When you submit votes, safety flags, anime
              trigger warning metrics, or comments:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You grant Mamorulist a non-exclusive, perpetual, worldwide, royalty-free license to
                host, store, display, publicly perform, and distribute that content across the
                platform.
              </li>
              <li>
                Because this is a public community archive, your database contributions (such as
                votes and trigger metrics) will remain part of the collective database indefinitely,
                even if your individual account is later closed or deleted.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              3. Acceptable Use and Restrictions
            </h2>
            <p>
              You agree to use Mamorulist in good faith to build an accurate safety resource. You
              are strictly prohibited from:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Vandalisng database entries, deliberately submitting false or misleading trigger
                warnings, or manipulating voting metrics through automation or multiple accounts.
              </li>
              <li>Harassing, abusing, or attacking other users in the comment sections.</li>
              <li>
                Attempting to scrape the database extensively or disrupt our hosting servers through
                excessive automated requests.
              </li>
            </ul>
            <p className="mt-2">
              We reserve the right to suspend or terminate any user account that violates these
              rules at our sole discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              4. Disclaimers and Limitation of Liability
            </h2>
            <p className="text-text font-semibold">
              Mamorulist is provided on an "as-is" and "as-available" basis.
            </p>
            <p>
              All trigger warnings, safety indicators, and comments on this site are crowdsourced
              contributions from general users. We do not guarantee the absolute accuracy,
              completeness, or clinical validity of any warning metrics displayed on the platform.
            </p>
            <p>
              The information provided here is for general community awareness and informational
              purposes only. It does not constitute medical, psychological, or professional mental
              health advice. You utilize the data on this platform entirely at your own risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text font-serif text-2xl font-semibold">
              5. Inquiries and Contact
            </h2>
            <p>
              For any questions regarding these terms, or to report platform abuse or request manual
              data removal, please visit our contact page.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

TermsOfService.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default TermsOfService;
