import { Link, usePage } from "@inertiajs/react";
import BackLayout from "../../../Layouts/BackLayout";
import {
  LuBook,
  LuBookA,
  LuCog,
  LuFolder,
  LuHouse,
  LuMegaphone,
  LuMessageCircle,
  LuMessageSquareDiff,
  LuTag,
  LuUsers,
  LuVote,
} from "react-icons/lu";
import SidebarLink from "../../../Components/UI/SidebarLink";

const Dashboard = () => {
  const { routes } = usePage().props;

  return (
    <div className="grid min-h-screen grid-cols-[270px_1fr]">
      {/* Sidebar */}
      <div className="bg-background border-border hidden border-r lg:flex lg:flex-col lg:gap-4 lg:p-4">
        <Link
          href={routes["dashboard.index"]}
          className="text-primary mb-2 text-center font-serif text-2xl font-bold"
        >
          Mamorulist
        </Link>

        <nav className="flex flex-col">
          {/* Main */}
          <SidebarLink
            href={routes["dashboard.index"]}
            routeName="dashboard.index"
          >
            <LuHouse size={18} /> Overview
          </SidebarLink>

          {/* Content */}
          <p className="my-2 px-3 text-sm">Content</p>

          <SidebarLink href="#" routeName="anime.index">
            <LuFolder size={18} /> Anime
          </SidebarLink>

          <SidebarLink href="#" routeName="genres.index">
            <LuTag size={18} /> Genres
          </SidebarLink>

          <SidebarLink href="#" routeName="triggers.index">
            <LuBook size={18} /> Trigger
          </SidebarLink>

          <SidebarLink href="#" routeName="trigger-categories.index">
            <LuBookA size={18} /> Trigger Categories
          </SidebarLink>

          {/* Community */}
          <p className="my-2 px-3 text-sm">Community</p>

          <SidebarLink href="#" routeName="users.index">
            <LuUsers size={18} /> Users
          </SidebarLink>

          <SidebarLink href="#" routeName="votes.index">
            <LuVote size={18} /> Votes
          </SidebarLink>

          <SidebarLink href="#" routeName="reviews.index">
            <LuMessageSquareDiff size={18} /> Reviews
          </SidebarLink>

          <SidebarLink href="#" routeName="comments.index">
            <LuMessageCircle size={18} /> Comments
          </SidebarLink>

          {/* System */}
          <p className="my-2 px-3 text-sm">System</p>

          <SidebarLink href="#" routeName="announcements.index">
            <LuMegaphone size={18} /> Announcement
          </SidebarLink>

          <SidebarLink href="#" routeName="settings.index">
            <LuCog size={18} /> Settings
          </SidebarLink>
        </nav>
      </div>

      {/* Content */}
      <main className="bg-surface"></main>
    </div>
  );
};

Dashboard.layout = (page) => <BackLayout>{page}</BackLayout>;

export default Dashboard;
