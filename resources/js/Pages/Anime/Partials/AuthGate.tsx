import { Link } from "@inertiajs/react";
import { LuLogIn } from "react-icons/lu";

interface AuthGateProps {
  loginHref: string;
  registerHref: string;
}

const AuthGate = ({ loginHref, registerHref }: AuthGateProps) => (
  <div className="flex flex-col items-start justify-center gap-3 py-1">
    <div className="flex items-start gap-2.5">
      <LuLogIn className="text-text-muted mt-0.5 shrink-0 text-sm" />
      <div>
        <p className="text-text text-xs font-semibold">
          Sign in to share your experience
        </p>
        <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
          Only members can vote. Your votes help others make informed decisions.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <Link
        href={loginHref}
        className="border-primary bg-primary text-surface hover:bg-primary-dark hover:border-primary-dark focus-visible:ring-border rounded-md border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
      >
        Log in
      </Link>
      <Link
        href={registerHref}
        className="border-border text-text-muted hover:border-primary-dark hover:text-primary-dark focus-visible:ring-border rounded-md border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
      >
        Create an account
      </Link>
    </div>
  </div>
);

export default AuthGate;
