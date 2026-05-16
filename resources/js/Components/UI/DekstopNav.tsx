import { Link, usePage } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";

const DesktopNav = () => {
  const { routes, auth } = usePage().props;
  const { component } = usePage();

  const isHomeActive = component === "Home/Index";
  const isBrowseActive = component.startsWith("Browse/");

  return (
    <header className="bg-surface border-border sticky top-0 z-50 hidden w-full border-b transition-colors duration-200 lg:block">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={routes["home.index"]}
          className="text-primary font-serif text-2xl font-bold tracking-wider transition-opacity hover:opacity-90"
        >
          Mamorulist
        </Link>

        {/* Navigation Links */}
        <nav className="h-full">
          <ul className="flex h-full items-center gap-8">
            <li className="relative flex h-full items-center">
              <Link
                href={routes["home.index"]}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isHomeActive
                    ? "text-accent-gold"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Home
              </Link>
              {isHomeActive && (
                <span className="bg-accent-gold absolute bottom-0 left-0 h-0.5 w-full rounded-full" />
              )}
            </li>
            <li className="relative flex h-full items-center">
              <Link
                href={routes["browse.index"]}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isBrowseActive
                    ? "text-accent-gold"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Browse Anime
              </Link>
              {isBrowseActive && (
                <span className="bg-accent-gold absolute bottom-0 left-0 h-0.5 w-full rounded-full" />
              )}
            </li>
          </ul>
        </nav>

        {/* Actions / Auth */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {!auth.user ? (
              <>
                <Link
                  href={routes["login"]}
                  className="text-text-muted hover:text-text text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href={routes["auth.register"]}
                  className="bg-primary text-surface hover:bg-primary-dark rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                href={
                  auth.user.role_id === "user"
                    ? routes["user.dash.index"]
                    : routes["dashboard.index"]
                }
                className="bg-primary text-surface hover:bg-primary-dark rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200"
              >
                My Account
              </Link>
            )}
          </div>

          {/* Visual Divider */}
          <div className="border-border h-5 border-l" />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default DesktopNav;
