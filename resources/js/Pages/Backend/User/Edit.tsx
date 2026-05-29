import type React from 'react';
import BackLayout from '../../../Layouts/BackLayout';
import { Form, router } from '@inertiajs/react';
import {
  triggerReset,
  update,
} from '../../../actions/App/Http/Controllers/Backend/ManageUserController';

interface Props {
  user: {
    id: number;
    name: string;
    username: string;
    email: string | null;
    birth_date: string | null;
    is_banned: boolean;
  };
}

const EditUser = ({ user }: Props) => {
  console.log(user);
  const handleTriggerReset = () => {
    if (confirm(`Are you sure you want to send a password reset link to ${user.email}?`)) {
      router.post(
        triggerReset.url({ userId: user.id }),
        {},
        {
          preserveScroll: true,
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* View Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-text font-serif text-2xl font-semibold">Edit User</h1>
          <p className="text-text-muted mt-1 text-xs">
            Manage profile information and system permissions for{' '}
            <span className="text-text font-semibold">{user.username}</span>
          </p>
        </div>
      </div>

      {/* Main Configurations Form Block */}
      <div className="bg-surface border-border rounded-xl border p-6">
        <Form
          action={update.url({ userId: user.id })}
          method="put"
          options={{
            preserveScroll: true,
          }}
        >
          {({ errors }) => (
            <div className="flex flex-col gap-6">
              {/* Profile Information Section */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-text font-serif text-base font-medium">
                    Profile Information
                  </h2>
                  <p className="text-text-muted text-xs">
                    Update core user identity values and record data.
                  </p>
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
                      placeholder="User's display name"
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
                      <span className="text-accent-red mt-1 block text-xs">{errors.username}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-text text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={user.email ?? ''}
                      className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                      placeholder="User's email address"
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

              <hr className="border-border" />

              {/* Moderation Settings Section */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-text font-serif text-base font-medium">
                    Moderation Settings
                  </h2>
                </div>

                <div className="bg-surface-alt/40 border-border rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 items-center">
                      <input type="hidden" name="is_banned" value="0" />
                      <input
                        type="checkbox"
                        id="is_banned"
                        name="is_banned"
                        value="1"
                        defaultChecked={user.is_banned ?? false}
                        className="border-border text-primary focus:ring-accent-gold bg-surface-alt h-4 w-4 rounded-sm transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <label
                        htmlFor="is_banned"
                        className="text-text cursor-pointer text-sm font-medium select-none"
                      >
                        Restrict Account Access (Is Banned)
                      </label>
                      <p className="text-text-muted text-xs select-none">
                        Activating this switch completely locks the user out of writing content or
                        logging into their platform interface.
                      </p>
                    </div>
                  </div>
                  {errors.is_banned && (
                    <span className="text-accent-red mt-2 block text-xs">{errors.is_banned}</span>
                  )}
                </div>
              </div>

              {/* Isolated Staged Form Submission Footer */}
              <div className="border-border flex justify-end border-t pt-4">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-surface cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide shadow-xs transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

EditUser.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default EditUser;
