import { Link } from "@inertiajs/react";
import {
  LuBookmark,
  LuCog,
  LuLayoutDashboard,
  LuMessageCircle,
  LuThumbsUp,
} from "react-icons/lu";

const DashMobileNav = () => {
  return (
    <div className="bg-surface border-border border-b md:hidden">
      {/* Profile header */}
      <div className="px-4 pt-5 pb-4">
        <div className="mb-4 flex items-center gap-3">
          <div>
            <p className="text-text text-base leading-tight font-semibold">
              Yuki K.
            </p>
            <p className="text-text-muted mt-0.5 text-xs">Joined May 2026</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="divide-border bg-surface-alt flex divide-x overflow-hidden rounded-lg">
          <div className="flex-1 py-2.5 text-center">
            <p className="text-primary-dark text-base leading-none font-bold">
              127
            </p>
            <p className="text-text-muted mt-1 text-[10px]">Votes</p>
          </div>
          <div className="flex-1 py-2.5 text-center">
            <p className="text-primary-dark text-base leading-none font-bold">
              34
            </p>
            <p className="text-text-muted mt-1 text-[10px]">Reviews</p>
          </div>
          <div className="flex-1 py-2.5 text-center">
            <p className="text-primary-dark text-base leading-none font-bold">
              8
            </p>
            <p className="text-text-muted mt-1 text-[10px]">Watching</p>
          </div>
        </div>
      </div>

      {/* Scrollable tab strip */}
      <div className="border-border flex overflow-x-auto border-t [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Link
          href="/dash"
          className="border-primary text-primary-dark flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-medium"
        >
          <LuLayoutDashboard size={14} strokeWidth={2.5} />
          Overview
        </Link>

        <Link
          href="/watchlist"
          className="text-text-muted hover:text-text flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-xs font-medium transition-colors duration-150"
        >
          <LuBookmark size={14} strokeWidth={2} />
          Watchlist
        </Link>

        <Link
          href="#"
          className="text-text-muted hover:text-text flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-xs font-medium transition-colors duration-150"
        >
          <LuMessageCircle size={14} strokeWidth={2} />
          Comments
        </Link>

        <Link
          href="#"
          className="text-text-muted hover:text-text flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-xs font-medium transition-colors duration-150"
        >
          <LuThumbsUp size={14} strokeWidth={2} />
          Votes
        </Link>

        <Link
          href="#"
          className="text-text-muted hover:text-text flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-xs font-medium transition-colors duration-150"
        >
          <LuCog size={14} strokeWidth={2} />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default DashMobileNav;
