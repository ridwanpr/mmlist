import { Link } from "@inertiajs/react";
import {
  LuBookmark,
  LuCog,
  LuLayoutDashboard,
  LuLogOut,
  LuMessageCircle,
  LuThumbsUp,
} from "react-icons/lu";

const DashSidebar = () => {
  return (
    <aside className="sticky top-6 hidden w-60 shrink-0 flex-col self-start md:flex">
      <div className="bg-surface border-border overflow-hidden rounded-xl border">
        {/* Profile */}
        <div className="border-border flex items-center gap-3 border-b px-4 py-5">
          <div className="bg-primary-soft flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
            <span className="text-primary-dark text-sm font-semibold">YK</span>
          </div>
          <div className="min-w-0">
            <p className="text-text truncate text-sm font-semibold">Yuki K.</p>
            <p className="text-text-muted text-xs">Joined May 2026</p>
          </div>
        </div>

        {/* Primary nav */}
        <nav className="p-2">
          <ul className="space-y-0.5">
            <li>
              <Link
                href="#"
                className="bg-primary-soft text-primary-dark flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium"
              >
                <LuLayoutDashboard
                  size={17}
                  strokeWidth={2.5}
                  className="shrink-0"
                />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="text-text-muted hover:bg-surface-alt hover:text-text flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150"
              >
                <LuBookmark size={17} strokeWidth={2} className="shrink-0" />
                Watchlist
                <span className="bg-primary text-surface ml-auto rounded-full px-2 py-0.5 text-[10px] leading-none font-semibold">
                  12
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="text-text-muted hover:bg-surface-alt hover:text-text flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150"
              >
                <LuMessageCircle
                  size={17}
                  strokeWidth={2}
                  className="shrink-0"
                />
                Comments
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="text-text-muted hover:bg-surface-alt hover:text-text flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150"
              >
                <LuThumbsUp size={17} strokeWidth={2} className="shrink-0" />
                My Votes
              </Link>
            </li>
          </ul>
        </nav>

        {/* Impact card */}
        <div className="bg-surface-alt mx-2 mb-2 rounded-lg p-4">
          <p className="text-text mb-1 text-xs font-semibold">Your impact</p>
          <p className="text-text-muted text-xs leading-relaxed">
            Thank you for helping make anime safer for everyone.
          </p>
          <div className="mt-3 flex gap-4">
            <div>
              <p className="text-primary-dark text-lg leading-none font-bold">
                127
              </p>
              <p className="text-text-muted mt-0.5 text-[10px]">Votes</p>
            </div>
            <div>
              <p className="text-primary-dark text-lg leading-none font-bold">
                34
              </p>
              <p className="text-text-muted mt-0.5 text-[10px]">Reviews</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-border mx-2 h-px" />

        {/* Secondary nav */}
        <nav className="p-2">
          <ul className="space-y-0.5">
            <li>
              <Link
                href="#"
                className="text-text-muted hover:bg-surface-alt hover:text-text flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150"
              >
                <LuCog size={17} strokeWidth={2} className="shrink-0" />
                Settings
              </Link>
            </li>

            <li>
              <Link
                href="/logout"
                method="post"
                className="text-accent-red hover:bg-surface-alt flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150"
              >
                <LuLogOut size={17} strokeWidth={2} className="shrink-0" />
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default DashSidebar;
