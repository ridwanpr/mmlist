import { Form, Link, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import { FaGoogle } from "react-icons/fa";
import InputField from "../../Components/UI/InputField";

const Login = () => {
  const { routes } = usePage().props;

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

        <Form action="/login" method="POST" className="space-y-4">
          <InputField
            label="Username"
            name="username"
            type="text"
            placeholder="Your username"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
          />

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
        </Form>
      </div>
    </div>
  );
};

Login.layout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;
