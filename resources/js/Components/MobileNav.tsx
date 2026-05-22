import { Link, usePage } from "@inertiajs/react";
import { LuBookmark, LuCog, LuHouse, LuSearch, LuUser } from "react-icons/lu";
import type { IconType } from "react-icons";
import { index as watchlistIndex } from "../actions/App/Http/Controllers/WatchlistController";

interface NavItemProps {
  href: string;
  active: boolean;
  icon: IconType;
  label: string;
}

interface PageProps {
  routes: Record<string, string>;
  [key: string]: unknown;
}

const NavItem = ({ href, active, icon: Icon, label }: NavItemProps) => {
  return (
    <li className="flex-1">
      <Link
        href={href}
        className="group flex w-full flex-col items-center justify-center gap-1 py-2"
      >
        <div
          className={`flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300 ${
            active
              ? "bg-primary-soft text-primary-dark"
              : "text-text-muted group-hover:bg-surface-alt group-hover:text-text"
          }`}
        >
          <Icon
            size="20px"
            strokeWidth={active ? 2.5 : 2}
            className={`transition-transform duration-300 ${
              active ? "scale-110" : "scale-100"
            }`}
          />
        </div>

        <span
          className={`font-sans text-[10px] font-medium transition-colors duration-300 ${
            active ? "text-primary-dark" : "text-text-muted"
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

const MobileNav = () => {
  const { props, component } = usePage<PageProps>();
  const { routes } = props;

  return (
    <div
      className="bg-surface border-border fixed bottom-0 left-0 z-50 w-full border-t shadow-[0_-4px_20px_-10px_rgba(102,114,74,0.1)]"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <nav>
        <ul className="flex w-full items-center">
          <NavItem
            href={routes["home.index"]}
            active={component === "Home/Index"}
            icon={LuHouse}
            label="Home"
          />
          <NavItem
            href={routes["browse.index"]}
            active={
              component.startsWith("Browse/") || component.startsWith("Anime/")
            }
            icon={LuSearch}
            label="Browse"
          />
          <NavItem
            href={watchlistIndex.url()}
            active={component.startsWith("Watchlist/")}
            icon={LuBookmark}
            label="Watchlist"
          />
          <NavItem
            href="#"
            active={component.startsWith("Profile/")}
            icon={LuUser}
            label="Profile"
          />
          <NavItem
            href="#"
            active={component.startsWith("Settings/")}
            icon={LuCog}
            label="Settings"
          />
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
