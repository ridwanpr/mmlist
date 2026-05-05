import { Form, Link, router, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import { FaGoogle } from "react-icons/fa";
import InputField from "../../Components/UI/InputField";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const { routes, errors } = usePage().props;

  const [values, setValues] = useState({
    username: null,
    password: null,
  });

  function handleChange(e) {
    setValues((values) => ({
      ...values,
      [e.target.id]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.post("/login", values, { preserveState: true });
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm">
        <div className="mb-5">
          <h1 className="text-text font-serif text-2xl font-bold">
            Welcome back
          </h1>
          <p className="text-text-muted mt-2 text-sm leading-6">
            Log in to continue to{" "}
            <Link
              href={routes["home.index"]}
              className="text-primary hover:text-primary-dark font-serif font-semibold transition-colors"
            >
              mamorulist
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <InputField
              label="Username"
              name="username"
              type="text"
              placeholder="Your username"
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
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              handleChange={handleChange}
            />
            {errors.password && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:ring-4 focus:outline-none"
          >
            Log in
          </button>

          <button
            type="button"
            className="border-border bg-surface hover:bg-surface-alt text-text flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-text-muted pt-1 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href={routes["auth.register"]}
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

Login.layout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;
