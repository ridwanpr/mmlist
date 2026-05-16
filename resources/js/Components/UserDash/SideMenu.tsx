import {
  LuBookmark,
  LuCheck,
  LuCog,
  LuHouse,
  LuLogOut,
  LuMessageCircle,
} from "react-icons/lu";

import SidebarLink from "../UI/SidebarLink";

const SideMenu = () => {
  return (
    <div className="bg-surface border-border border my-8 hidden w-72 flex-col rounded-lg p-4 md:flex">
      <div className="mb-4 flex items-center gap-2">
        <img
          src="https://placehold.co/400x400"
          alt=""
          className="w-1/3 rounded-full object-cover"
        />
        <div>
          <p className="text-text text-sm">Lorem ipsum dolor sit amet.</p>
          <p className="text-text text-xs">Joined 7 May 2026</p>
        </div>
      </div>
      <SidebarLink href="#" routeName="user.dash.index">
        <LuHouse size={18} /> Dashboard
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuBookmark size={18} /> Watchlist
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuMessageCircle size={18} /> Comments
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuCheck size={18} /> My Votes
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuCog size={18} /> Settings
      </SidebarLink>
      <div className="bg-surface-alt my-4 rounded-lg p-4">
        <p className="text-text font-semibold">Your Impact</p>
        <p className="text-text-muted text-sm">
          Thank you for helping make anime a safer space for everyone!
        </p>
        <div className="mt-4">
          <p className="text-text-muted text-sm">Votes Submitted</p>
          <p className="text-xl font-semibold">127</p>
        </div>
        <div className="mt-4">
          <p className="text-text-muted text-sm">Reviews Written</p>
          <p className="text-xl font-semibold">127</p>
        </div>
      </div>
      <SidebarLink href="/logout" method="post" routeName="watchlist.index">
        <LuLogOut size={18} /> Logout
      </SidebarLink>
    </div>
  );
};

export default SideMenu;
