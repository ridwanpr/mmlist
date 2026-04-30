import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
    <footer className="bg-background border-primary/10 border-t pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="text-primary text-xl font-bold tracking-tight"
            >
              Mamorulist
            </Link>
            <p className="text-primary-dark max-w-sm text-xs">
              Helping anime fans make informed content choices.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            <div className="flex gap-4">
              <Link
                href="/faq"
                className="text-primary-dark hover:text-primary text-sm transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/about"
                className="text-primary-dark hover:text-primary text-sm transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-primary-dark hover:text-primary text-sm transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="border-primary/10 flex gap-4 lg:border-l lg:pl-8">
              <Link
                href="/tos"
                className="text-primary-dark hover:text-primary text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-primary-dark hover:text-primary text-sm transition-colors"
              >
                Privacy
              </Link>
            </div>
          </nav>

          <div className="text-primary-dark text-xs opacity-70">
            &copy; Mamorulist
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
