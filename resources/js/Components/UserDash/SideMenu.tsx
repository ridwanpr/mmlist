import {
  LuBookmark,
  LuCheck,
  LuCog,
  LuLayoutDashboard,
  LuLogOut,
  LuMessageCircle,
} from "react-icons/lu";

import SidebarLink from "../UI/SidebarLink";

const SideMenu = () => {
  return (
    <aside className="bg-surface border-border hidden w-72 flex-col rounded-xl border p-5 md:flex">
      <div className="mb-5 flex items-center gap-4">
        <div className="min-w-0">
          <p className="text-text truncate text-sm font-medium">
            Lorem ipsum dolor sit amet.
          </p>
          <p className="text-text-muted text-xs">Joined 7 May 2026</p>
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

      <SidebarLink href="#" routeName="#">
        <span className="flex items-center gap-3">
          <LuMessageCircle size={18} />
          <span>Comments</span>
        </span>
      </SidebarLink>

      <SidebarLink href="#" routeName="#">
        <span className="flex items-center gap-3">
          <LuCheck size={18} />
          <span>My Votes</span>
        </span>
      </SidebarLink>

      <SidebarLink href="#" routeName="#">
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
            <p className="text-text text-lg font-semibold">127</p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Reviews Written</p>
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
