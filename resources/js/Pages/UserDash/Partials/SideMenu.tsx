import { usePage } from "@inertiajs/react";
import {
  LuBookmark,
  LuCheck,
  LuCog,
  LuLayoutDashboard,
  LuLogOut,
  LuMessageCircle,
} from "react-icons/lu";
import SidebarLink from "../../../Components/UI/SidebarLink";
import { index as voteIndex } from "../../../actions/App/Http/Controllers/VoteController";
import { settingIndex } from "../../../actions/App/Http/Controllers/UserDashboardController";
import { index as commentIndex } from "../../../actions/App/Http/Controllers/CommentHistoryController";

const SideMenu = () => {
  const { auth } = usePage().props;

  const votesCount = auth?.user?.votes_count ?? 0;
  const userName = auth?.user?.name || "Guest User";
  const joinedAt = auth?.user?.joined_at || "Recent";

  return (
    <aside className="bg-surface border-border hidden w-72 flex-col self-start rounded-xl border p-5 md:flex">
      <div className="mb-5 flex items-center gap-4">
        <div className="min-w-0">
          <p className="text-text truncate font-medium">{userName}</p>
          <p className="text-text-muted text-xs">Joined {joinedAt}</p>
        </div>
      </div>

      <SidebarLink href="/dash" routeName="user.dash.index">
        <span className="flex items-center gap-3">
          <LuLayoutDashboard size={18} />
          <span>Overview</span>
        </span>
      </SidebarLink>

      <SidebarLink href="/watchlist" routeName="watchlist.index">
        <span className="flex items-center gap-3">
          <LuBookmark size={18} />
          <span>Watchlist</span>
        </span>
      </SidebarLink>

      <SidebarLink href={commentIndex.url()} routeName="comment-history.index">
        <span className="flex items-center gap-3">
          <LuMessageCircle size={18} />
          <span>Comments</span>
        </span>
      </SidebarLink>

      <SidebarLink href={voteIndex.url()} routeName="#">
        <span className="flex items-center gap-3">
          <LuCheck size={18} />
          <span>My Votes</span>
        </span>
      </SidebarLink>

      <SidebarLink href={settingIndex.url()} routeName="user-setting.index">
        <span className="flex items-center gap-3">
          <LuCog size={18} />
          <span>Settings</span>
        </span>
      </SidebarLink>

      <div className="bg-surface-alt mt-5 rounded-2xl p-4">
        <p className="text-text mb-2 font-semibold">Your Impact</p>
        <p className="text-text-muted text-sm leading-relaxed">
          Thank you for helping make anime a safer space for everyone!
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-text-muted text-xs">Votes Submitted</p>
            <p className="text-text text-lg font-semibold">{votesCount}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Comment Written</p>
            <p className="text-text text-lg font-semibold">127</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <SidebarLink href="/logout" method="post" routeName="auth.logout">
          <span className="flex items-center gap-3">
            <LuLogOut size={18} />
            <span>Logout</span>
          </span>
        </SidebarLink>
      </div>
    </aside>
  );
};

export default SideMenu;
