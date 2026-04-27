import { Link, usePage } from "@inertiajs/react";

const DekstopNav = () => {
  const { component } = usePage();

  return (
    <div className="bg-surface hidden lg:flex">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
        <Link
          href={route("home.index")}
          className="text-primary font-serif text-2xl font-bold tracking-wider"
        >
          Mamorulist
        </Link>
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href={route("home.index")}
                className={
                  component === "Home/Index"
                    ? "text-accent-gold text-sm font-bold"
                    : "text-sm"
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={route("browse.index")}
                className={
                  component.startsWith("Browse/")
                    ? "text-accent-gold text-sm font-bold"
                    : "text-sm"
                }
              >
                Browse Anime
              </Link>
            </li>
            <li>
              <Link className="text-sm">Trigger List</Link>
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
            <Link className="bg-primary text-surface mr-2 rounded-md p-2 text-sm">
              Register
            </Link>
            <Link className="bg-accent-gold text-surface rounded-md p-2 text-sm">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DekstopNav;
