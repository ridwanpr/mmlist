import { Link, usePage } from "@inertiajs/react";
import { LuBookmark, LuCog, LuHouse, LuCompass, LuUser } from "react-icons/lu";
import type { IconType } from "react-icons";
import { index as watchlistIndex } from "../actions/App/Http/Controllers/WatchlistController";
import {
  index,
  settingIndex,
} from "../actions/App/Http/Controllers/UserDashboardController";

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
    <li className="h-full flex-1 list-none">
      <Link
        href={href}
        prefetch={"click"}
        className="group flex h-full w-full flex-col items-center justify-center gap-1 select-none"
      >
        <div
          className={`flex h-8 w-16 items-center justify-center rounded-full transition-all duration-200 ease-in-out ${
            active
              ? "bg-primary-soft text-primary-dark"
              : "text-text-muted group-hover:bg-surface-alt group-active:scale-95"
          }`}
        >
          <Icon
            size="22px"
            strokeWidth={active ? 2.5 : 2}
            className={`transition-transform duration-200 ease-in-out ${
              active ? "scale-105" : "scale-100"
            }`}
          />
        </div>

        <span
          className={`font-sans text-xs font-medium tracking-wide transition-colors duration-200 ease-in-out ${
            active ? "text-primary-dark font-semibold" : "text-text-muted"
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
      className="bg-surface border-border fixed bottom-0 left-0 z-50 w-full border-t shadow-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav className="h-20 w-full px-2">
        <ul className="flex h-full w-full items-center justify-between">
          <NavItem
            href={routes["home.index"]}
            active={component === "Home/Index"}
            icon={LuHouse}
            label="Home"
          />
          <NavItem
            href={routes["browse.index"]}
            active={
              component.startsWith("Browse/") ||
              component.startsWith("Anime/") ||
              component.startsWith("AnimeComment/") ||
              component.startsWith("TriggerComment/")
            }
            icon={LuCompass}
            label="Browse"
          />
          <NavItem
            href={index.url()}
            active={
              component.startsWith("UserDash/") ||
              component.startsWith("Watchlist/") ||
              component.startsWith("Votes/")
            }
            icon={LuUser}
            label="Profile"
          />
          <NavItem
            href={settingIndex.url()}
            active={component.startsWith("UserSetting/")}
            icon={LuCog}
            label="Settings"
          />
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
