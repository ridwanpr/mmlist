import { Link, usePage } from "@inertiajs/react";
import {
  LuBookmark,
  LuLayoutDashboard,
  LuMessageCircle,
  LuThumbsUp,
} from "react-icons/lu";
import { index as userDashIndex } from "../../../actions/App/Http/Controllers/UserDashboardController";
import { index as watchlistIndex } from "../../../actions/App/Http/Controllers/WatchlistController";
import { index as voteIndex } from "../../../actions/App/Http/Controllers/VoteController";

const DashMobileNav = () => {
  const { url } = usePage();
  const { auth } = usePage().props;

  const votesCount = auth?.user?.votes_count ?? 0;
  const userName = auth?.user?.name || "Guest User";
  const joinedAt = auth?.user?.joined_at || "Recent";

  return (
    <div className="bg-surface border-border border-b md:hidden">
      {/* Profile header */}
      <div className="px-4 pt-5 pb-4">
        <div className="mb-4 flex items-center gap-3">
          <div>
            <p className="text-text text-base leading-tight font-semibold">
              {userName}
            </p>
            <p className="text-text-muted mt-0.5 text-xs">Joined {joinedAt}</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="divide-border bg-surface-alt flex divide-x overflow-hidden rounded-lg">
          <div className="flex-1 py-2.5 text-center">
            <p className="text-primary-dark text-base leading-none font-bold">
              {votesCount}
            </p>
            <p className="text-text-muted mt-1 text-[10px]">Votes</p>
          </div>
          <div className="flex-1 py-2.5 text-center">
            <p className="text-primary-dark text-base leading-none font-bold">
              34
            </p>
            <p className="text-text-muted mt-1 text-[10px]">Comments</p>
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
          href={userDashIndex.url()}
          className={`${url.startsWith(userDashIndex.url()) ? "border-primary text-primary-dark border-b-2" : "text-text-muted"} flex shrink-0 items-center gap-1.5 px-4 py-3 text-xs font-medium`}
        >
          <LuLayoutDashboard size={14} strokeWidth={2.5} />
          Overview
        </Link>

        <Link
          href={watchlistIndex.url()}
          className={`${url.startsWith(watchlistIndex.url()) ? "border-primary text-primary-dark border-b-2" : "text-text-muted"} flex shrink-0 items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors duration-150`}
        >
          <LuBookmark size={14} strokeWidth={2} />
          Watchlist
        </Link>

        <Link
          href={voteIndex.url()}
          className={`${url.startsWith(voteIndex.url()) ? "border-primary text-primary-dark border-b-2" : "text-text-muted"} flex shrink-0 items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors duration-150`}
        >
          <LuThumbsUp size={14} strokeWidth={2} />
          Votes
        </Link>

        <Link
          href="#"
          className="text-text-muted flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-xs font-medium transition-colors duration-150"
        >
          <LuMessageCircle size={14} strokeWidth={2} />
          Comments
        </Link>
      </div>
    </div>
  );
};

export default DashMobileNav;
