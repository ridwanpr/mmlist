import type React from 'react';
import BackLayout from '../../../Layouts/BackLayout';
import { Form } from '@inertiajs/react';

const Create = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* View Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-text font-serif text-2xl font-semibold">Create Announcement</h1>
          <p className="text-text-muted mt-1 text-xs">
            Draft and publish a new system-wide announcement.
          </p>
        </div>
      </div>

      {/* Main Configurations Form Block */}
      <div className="bg-surface border-border rounded-xl border p-6">
        {/* Replace the string action below with your generated action URL helper if needed */}
        <Form
          action="/admin/announce"
          method="post"
          options={{
            preserveScroll: true,
          }}
        >
          {({ errors }) => (
            <div className="flex flex-col gap-6">
              {/* Content Section */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-text font-serif text-base font-medium">
                    Announcement Content
                  </h2>
                  <p className="text-text-muted text-xs">
                    Provide a clear title and the full message body.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-text text-sm font-medium">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                      placeholder="e.g., Scheduled Maintenance Notification"
                    />
                    {errors.title && (
                      <span className="text-accent-red mt-1 block text-xs">{errors.title}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="body" className="text-text text-sm font-medium">
                      Message Body
                    </label>
                    <textarea
                      id="body"
                      name="body"
                      rows={6}
                      className="border-border bg-surface-alt text-text focus:border-accent-gold w-full resize-y rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                      placeholder="Write your full announcement details here..."
                    ></textarea>
                    {errors.body && (
                      <span className="text-accent-red mt-1 block text-xs">{errors.body}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Isolated Staged Form Submission Footer */}
              <div className="border-border flex justify-end border-t pt-4">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-surface cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide shadow-xs transition-colors"
                >
                  Publish Announcement
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

Create.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default Create;
