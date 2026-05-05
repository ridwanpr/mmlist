import {
  LuBookmark,
  LuCheck,
  LuCog,
  LuHouse,
  LuLogOut,
  LuStar,
} from "react-icons/lu";
import SidebarLink from "../UI/SidebarLink";

const SideMenu = () => {
  return (
    <div className="border-border bg-surface flex w-[270px] flex-col border-x p-4">
      <SidebarLink href="#" routeName="user.dash.index">
        <LuHouse size={18} /> Dashboard
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuBookmark size={18} /> Watchlist
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuStar size={18} /> Reviews
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuCheck size={18} /> My Votes
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuCog size={18} /> Settings
      </SidebarLink>
      <SidebarLink href="#" routeName="watchlist.index">
        <LuLogOut size={18} /> Logout
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
    </div>
  );
};

export default SideMenu;
