import { Link, usePage } from "@inertiajs/react";
import { LuBookmark, LuHouse, LuList, LuSearch, LuUser } from "react-icons/lu";

const MobileNav = () => {
  const { routes } = usePage().props;
  const { component } = usePage();

  return (
    <div className="bg-surface border-border fixed bottom-0 left-0 z-50 w-full border-t px-6 py-4">
      <nav>
        <ul className="flex items-center justify-between gap-4">
          <li>
            <Link
              href={routes["home.index"]}
              className={`flex flex-col items-center ${
                component === "Home/Index" ? "text-primary" : "text-text"
              }`}
            >
              <LuHouse size="20px" />
              <span className="text-xs">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href={routes["browse.index"]}
              className={`flex flex-col items-center ${
                component.startsWith("Browse/") ? "text-primary" : "text-text"
              }`}
            >
              <LuSearch size="20px" />
              <span className="text-xs">Browse</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="text-text flex flex-col items-center">
              <LuList size="20px" />
              <span className="text-xs">Trigger</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="text-text flex flex-col items-center">
              <LuBookmark size="20px" />
              <span className="text-xs">Watchlist</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="text-text flex flex-col items-center">
              <LuUser size="20px" />
              <span className="text-xs">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
