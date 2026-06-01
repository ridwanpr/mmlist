import type React from 'react';
import DashContainer from '../UserDash/Partials/DashContainer';
import FrontLayout from '../../Layouts/FrontLayout';
import { Form, useForm } from '@inertiajs/react';
import { update } from '../../actions/App/Http/Controllers/UserProfileController';
import ThemeToggle from '../../Components/UI/ThemeToggle';
import AppHead from '../../Components/AppHead';

const UserSetting = ({ user }: { user: App.DTOs.UserData }) => {
  const { data, setData, post, processing, errors, progress } = useForm({
    xml_file: null as File | null,
  });

  const handleImportSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!data.xml_file) return;

    post('/watchlist/import', {
      forceFormData: true,
      onSuccess: () => {
        alert(
          'Your import is being processed. Your watchlist will be updated automatically upon completion.',
        );
        setData('xml_file', null);
      },
    });
  };

  return (
    <>
      <AppHead title="Settings" />
      <DashContainer>
        <div className="mb-6 p-4 lg:p-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
              Setting
            </h1>
            <p className="text-text-muted text-xs">Change site config and your information</p>
          </div>

          {/* Mobile-Only Theme Toggle Section */}
          <div className="bg-surface border-border mb-6 flex items-center justify-between rounded-lg border p-4 lg:hidden">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-text font-serif text-sm font-medium">Interface Theme</h2>
              <p className="text-text-muted text-xs">Toggle between light and dark theme.</p>
            </div>
            <ThemeToggle />
          </div>

          {/* Main Settings Form Container */}
          <div className="bg-surface border-border flex flex-col gap-8 rounded-lg border p-6">
            <Form action={update.url({ username: user.username })} method="put">
              {({ errors }) => (
                <>
                  {/* Profile Information */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-text font-serif text-base font-medium">
                        Profile Information
                      </h2>
                      <p className="text-text-muted text-xs">Update your account information.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-text text-sm font-medium">
                          Display Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          defaultValue={user.name}
                          className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                          placeholder="Your display name"
                        />
                        {errors.name && (
                          <span className="text-accent-red mt-1 block text-xs">{errors.name}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="username" className="text-text text-sm font-medium">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          defaultValue={user.username}
                          className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                          placeholder="Username"
                        />
                        {errors.username && (
                          <span className="text-accent-red mt-1 block text-xs">
                            {errors.username}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-text text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          type="type"
                          id="email"
                          name="email"
                          defaultValue={user.email ?? ''}
                          className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                          placeholder="Your active email address"
                        />
                        {errors.email && (
                          <span className="text-accent-red mt-1 block text-xs">{errors.email}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="birth_date" className="text-text text-sm font-medium">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          id="birth_date"
                          name="birth_date"
                          defaultValue={user.birth_date ?? ''}
                          className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                        />
                        {errors.birth_date && (
                          <span className="text-accent-red mt-1 block text-xs">
                            {errors.birth_date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {user.email == null && (
                    <div className="bg-primary-soft mt-6 rounded-xl px-4 py-2.5">
                      <p className="text-text text-xs">
                        To ensure we can help you if any problems arise, please make sure to add an
                        email address to your account
                      </p>
                    </div>
                  )}

                  <hr className="border-border my-6" />

                  {/* Content Preferences */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-text font-serif text-base font-medium">
                        Content Preferences
                      </h2>
                    </div>

                    <div className="bg-surface-alt/40 border-border rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-5 items-center">
                          <input type="hidden" name="show_nsfw" value="0" />
                          <input
                            key={errors.show_nsfw ? 'nsfw-error' : 'nsfw-stable'}
                            type="checkbox"
                            id="show_nsfw"
                            name="show_nsfw"
                            value="1"
                            defaultChecked={user.show_nsfw ?? false}
                            className="border-border text-primary focus:ring-accent-gold bg-surface-alt h-4 w-4 rounded-sm transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <label
                            htmlFor="show_nsfw"
                            className="text-text cursor-pointer text-sm font-medium select-none"
                          >
                            Show NSFW / Adult Content
                          </label>
                          <p className="text-text-muted text-xs select-none">
                            Checking this option uncovers adult themes and age-restricted anime
                            titles.
                          </p>
                        </div>
                      </div>
                      {errors.show_nsfw && (
                        <span className="text-accent-red mt-2 block text-xs">
                          {errors.show_nsfw}
                        </span>
                      )}
                    </div>
                  </div>

                  <hr className="border-border my-6" />

                  {/* Change Password */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-text font-serif text-base font-medium">
                        Security Update
                      </h2>
                      <p className="text-text-muted text-xs">
                        Change your current account access credentials.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="current_password" className="text-text text-sm font-medium">
                          Previous Password
                        </label>
                        <input
                          type="password"
                          id="current_password"
                          name="current_password"
                          className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                          placeholder="Confirm your old password"
                        />
                        {errors.current_password && (
                          <span className="text-accent-red mt-1 block text-xs">
                            {errors.current_password}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="password" className="text-text text-sm font-medium">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                            placeholder="Minimum 6 characters"
                          />
                          {errors.password && (
                            <span className="text-accent-red mt-1 block text-xs">
                              {errors.password}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="password_confirmation"
                            className="text-text text-sm font-medium"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                            placeholder="Repeat new password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button footer */}
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-dark text-surface cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide shadow-xs transition-colors"
                    >
                      Save Settings
                    </button>
                  </div>
                </>
              )}
            </Form>
          </div>

          {/* Watchlist XML Import Card */}
          <div className="bg-surface border-border mt-6 flex flex-col gap-4 rounded-lg border p-6">
            <div>
              <h2 className="text-text font-serif text-base font-medium">Import Watchlist</h2>
              <p className="text-text-muted text-xs">
                Upload your MyAnimeList XML data backup here
              </p>
            </div>

            <form onSubmit={handleImportSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <input
                  type="file"
                  id="xml_file"
                  accept=".xml"
                  onChange={e => setData('xml_file', e.target.files?.[0] ?? null)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold file:bg-primary file:text-surface w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors file:mr-4 file:rounded-md file:border-0 file:px-3 file:py-1 file:text-xs file:font-semibold hover:file:opacity-90"
                />
                {errors.xml_file && (
                  <span className="text-accent-red mt-1 block text-xs">{errors.xml_file}</span>
                )}
              </div>

              {progress && (
                <div className="bg-surface-alt h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-accent-gold h-full transition-all duration-150"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={processing || !data.xml_file}
                  className="bg-primary hover:bg-primary-dark text-surface disabled:bg-text-muted cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide shadow-xs transition-colors disabled:cursor-not-allowed"
                >
                  {processing ? 'Uploading...' : 'Start Import'}
                </button>
              </div>
            </form>
          </div>

          {/* Mobile-Only Logout Section */}
          <div className="bg-surface border-border mt-6 flex items-center justify-between rounded-lg border p-4 lg:hidden">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-text font-serif text-sm font-medium">Account Session</h2>
            </div>
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="text-surface border-border bg-primary inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:cursor-pointer"
              >
                Log Out
              </button>
            </Form>
          </div>
        </div>
      </DashContainer>
    </>
  );
};

UserSetting.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserSetting;
