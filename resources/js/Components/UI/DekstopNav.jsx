import { Link, usePage } from "@inertiajs/react";

const DekstopNav = () => {
  const { routes, auth } = usePage().props;
  const { component } = usePage();

  return (
    <div className="bg-surface hidden lg:flex border border-border">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
        <Link
          href={routes["home.index"]}
          className="text-primary font-serif text-2xl font-bold tracking-wider"
        >
          Mamorulist
        </Link>

        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href={routes["home.index"]}
                className={
                  component === "Home/Index"
                    ? "text-accent-gold text-sm font-bold"
                    : "text-sm font-semibold"
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={routes["browse.index"]}
                className={
                  component.startsWith("Browse/")
                    ? "text-accent-gold text-sm font-bold"
                    : "text-sm font-semibold"
                }
              >
                Browse Anime
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm font-semibold">
                Trigger List
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <input
            type="text"
            className="border-primary rounded-md border px-2 py-1 placeholder:text-sm"
            placeholder="Search anime..."
          />
          <div>
            {!auth.user ? (
              <>
                <Link
                  href={routes["auth.register"]}
                  className="bg-primary text-surface mr-2 rounded-md p-2 text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  href={routes["login"]}
                  className="bg-accent-gold text-surface rounded-md p-2 text-sm font-medium"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                href={routes["user.dash.index"]}
                className="bg-primary text-surface mr-2 rounded-md p-2 text-sm font-medium"
              >
                My Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DekstopNav;
