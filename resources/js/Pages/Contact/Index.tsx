import type React from 'react';
import { useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';
import Turnstile, { type TurnstileInstance } from '../../Components/Turnstile';

interface ContactFormData {
  name: string;
  email: string;
  content: string;
  'cf-turnstile-response': string | null;
}

interface PageProps {
  turnstileSiteKey: string;
  turnstileEnabled: boolean;
  [key: string]: unknown;
}

const Contact = () => {
  const { turnstileSiteKey, turnstileEnabled } = usePage<PageProps>().props;
  const turnstileRef = useRef<TurnstileInstance>(null);

  const { data, setData, post, processing, errors, reset, wasSuccessful } =
    useForm<ContactFormData>({
      name: '',
      email: '',
      content: '',
      'cf-turnstile-response': null,
    });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => reset(),
      onError: () => {
        turnstileRef.current?.reset();
        setData('cf-turnstile-response', null);
      },
    });
  };

  return (
    <>
      <AppHead title="Contact - Mamorulist" meta="Contact" />

      <div className="mx-auto my-12 w-full px-4 lg:w-3xl lg:px-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Contact Us
          </h1>
          <p className="text-text-muted text-xs">
            Send a message to the Mamorulist team for inquiries, support, or feedback.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-surface border-border flex flex-col gap-6 rounded-lg border p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Form Fields Stack */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-text font-serif text-base font-medium">Message Details</h2>
                <p className="text-text-muted text-xs">
                  Please fill out the fields below to submit your message.
                </p>
              </div>

              {/* Status Banner */}
              {wasSuccessful && (
                <div className="bg-primary-soft rounded-xl px-4 py-2.5">
                  <p className="text-text text-xs font-medium">
                    Your message has been sent successfully. Thank you for reaching out.
                  </p>
                </div>
              )}

              {/* Identity Fields Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-text text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                    placeholder="Identify yourself"
                    required
                  />
                  {errors.name && (
                    <span className="text-accent-red mt-1 block text-xs">{errors.name}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-text text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                    placeholder="Your active email address (Optional)"
                  />
                  {errors.email && (
                    <span className="text-accent-red mt-1 block text-xs">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Optional Email Advice Banner */}
              <div className="bg-primary-soft rounded-xl px-4 py-2.5">
                <p className="text-text text-xs">Leave an email address if you expect a reply.</p>
              </div>

              {/* Content Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="content" className="text-text text-sm font-medium">
                  Message Content
                </label>
                <textarea
                  id="content"
                  rows={6}
                  value={data.content}
                  onChange={e => setData('content', e.target.value)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold min-h-30 w-full resize-y rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                  placeholder="Describe your inquiry or issue in detail..."
                  required
                />
                {errors.content && (
                  <span className="text-accent-red mt-1 block text-xs">{errors.content}</span>
                )}
              </div>
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
                  <span className="text-accent-red mt-1 block text-xs">
                    {errors['cf-turnstile-response']}
                  </span>
                )}
              </div>
            )}

            <hr className="border-border my-2" />

            {/* Action Footer */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={processing || (turnstileEnabled && !data['cf-turnstile-response'])}
                className="bg-primary hover:bg-primary-dark text-surface disabled:bg-text-muted cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide shadow-xs transition-colors disabled:cursor-not-allowed"
              >
                {processing
                  ? 'Sending...'
                  : turnstileEnabled && !data['cf-turnstile-response']
                    ? 'Verifying...'
                    : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

Contact.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Contact;
