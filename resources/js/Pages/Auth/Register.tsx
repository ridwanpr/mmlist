import { Form, Link, router, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import { FaGoogle } from "react-icons/fa";
import InputField from "../../Components/UI/InputField";
import React, { useState } from "react";

const Register = () => {
  const { routes, errors } = usePage().props;

  const [values, setValues] = useState({
    username: null,
    email: null,
    name: null,
    password: null,
    password_confirmation: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((values) => ({
      ...values,
      [e.target.id]: e.target.value,
    }));
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post("/register", values, { preserveState: true });
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm">
        <div className="mb-5">
          <h1 className="text-text font-serif text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-text-muted mt-2 text-sm leading-6">
            Join{" "}
            <Link
              href={routes["home.index"]}
              className="text-primary hover:text-primary-dark font-serif font-semibold transition-colors"
            >
              mamorulist
            </Link>{" "}
            and be part of a safer anime community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-1">
          <div>
            <InputField
              label="Name"
              name="name"
              type="text"
              placeholder="Public display name"
              handleChange={handleChange}
            />
            {errors.name && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <InputField
              label="Username"
              name="username"
              type="text"
              placeholder="Account username (used for login)"
              handleChange={handleChange}
            />
            {errors.username && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.username}
              </span>
            )}
          </div>

          <div>
            <InputField
              label="Email"
              name="email"
              type="text"
              placeholder="Optional, but required for recovery"
              handleChange={handleChange}
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              handleChange={handleChange}
            />
            {errors.password && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.password}
              </span>
            )}
          </div>

          <div>
            <InputField
              label="Confirm password"
              name="password_confirmation"
              type="password"
              placeholder="Repeat your password"
              handleChange={handleChange}
            />
            {errors.password_confirmation && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.password_confirmation}
              </span>
            )}
            <div className="mt-1 text-right">
              <Link
                href="#"
                className="text-primary hover:text-primary-dark text-xs font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 my-3 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none"
          >
            Create account
          </button>

          <button
            type="button"
            className="border-border bg-surface hover:bg-surface-alt text-text flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-text-muted pt-1 text-center text-sm">
            Already have an account?{" "}
            <Link
              href={routes["login"]}
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

Register.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default Register;
