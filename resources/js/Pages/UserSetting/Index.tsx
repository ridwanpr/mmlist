import type React from "react";
import DashContainer from "../UserDash/Partials/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";

const UserSetting = () => {
  return (
    <DashContainer>
      <div className="mb-6 p-4 lg:p-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Setting
          </h1>
          <p className="text-text-muted text-xs">
            Change site config and your information
          </p>
        </div>

        {/* Main Settings Form Container */}
        <div className="bg-surface border-border flex flex-col gap-8 rounded-lg border p-6">
          <form>
            {/* Profile Information */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-text font-serif text-base font-medium">
                  Profile Information
                </h2>
                <p className="text-text-muted text-xs">
                  Update your public display identity and email address.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-text text-sm font-medium"
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border-border bg-background text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                    placeholder="Your display name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="username"
                    className="text-text text-sm font-medium"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="border-border bg-background text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                    placeholder="Username"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-text text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border-border bg-background text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                    placeholder="Your active email address"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="birth_date"
                    className="text-text text-sm font-medium"
                  >
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    className="border-border bg-background text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                  />
                </div>
              </div>
            </div>

            <hr className="border-border my-6" />

            {/* Site Preferences */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-text font-serif text-base font-medium">
                  Content Preferences
                </h2>
                <p className="text-text-muted text-xs">
                  Manage how explicit media and community tags display for your
                  account.
                </p>
              </div>

              <div className="bg-surface-alt/40 border-border rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      id="show_nsfw"
                      name="show_nsfw"
                      className="border-border text-primary focus:ring-accent-gold bg-background h-4 w-4 rounded-sm transition-colors"
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
                      Checking this option uncovers adult themes and
                      age-restricted anime titles.
                    </p>
                  </div>
                </div>
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
                  <label
                    htmlFor="current_password"
                    className="text-text text-sm font-medium"
                  >
                    Previous Password
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    className="border-border bg-background text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                    placeholder="Confirm your old password"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="password"
                      className="text-text text-sm font-medium"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="border-border bg-background text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                      placeholder="Minimum 6 characters"
                    />
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
                      className="border-border bg-background text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
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
          </form>
        </div>
      </div>
    </DashContainer>
  );
};

UserSetting.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default UserSetting;
