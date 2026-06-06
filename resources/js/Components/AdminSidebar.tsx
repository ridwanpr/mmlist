import { Link } from '@inertiajs/react';
import {
  LuBook,
  LuBookA,
  LuCog,
  LuFolder,
  LuHouse,
  LuMegaphone,
  LuMessageCircle,
  LuMessageSquareWarning,
  LuTag,
  LuUsers,
  LuVote,
} from 'react-icons/lu';
import { index as userIndex } from '../actions/App/Http/Controllers/Backend/ManageUserController';
import { index as commentIndex } from '../actions/App/Http/Controllers/Backend/ManageCommentController';
import { index as contactIndex } from '../actions/App/Http/Controllers/Backend/ContactMessageController';
import { index as announceIndex } from '../actions/App/Http/Controllers/Backend/AnnounceController';

import SidebarLink from './UI/SidebarLink';

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  return (
    <aside
      className={`bg-surface border-border fixed inset-y-0 left-0 z-50 w-67.5 shrink-0 overflow-y-auto border-r p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/dashboard"
          className="text-primary mb-2 text-center font-serif text-2xl font-bold"
        >
          Mamorulist
        </Link>

        <nav className="flex flex-col">
          <SidebarLink href="/admin/dashboard" routeName="dashboard.index">
            <LuHouse size={18} /> Overview
          </SidebarLink>

          <p className="my-2 px-3 text-sm">Content</p>

          <SidebarLink href="/admin/anime" routeName="anime.index">
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

          <p className="my-2 px-3 text-sm">Community</p>

          <SidebarLink href={userIndex.url()} routeName="manage-user.index">
            <LuUsers size={18} /> Users
          </SidebarLink>

          <SidebarLink href="#" routeName="votes.index">
            <LuVote size={18} /> Votes
          </SidebarLink>

          <SidebarLink href={commentIndex.url()} routeName="manage-comment.index">
            <LuMessageCircle size={18} /> Comments
          </SidebarLink>

          <p className="my-2 px-3 text-sm">System</p>

          <SidebarLink href={contactIndex.url()} routeName="contact-message.index">
            <LuMessageSquareWarning size={18} /> Contact Message
          </SidebarLink>

          <SidebarLink href={announceIndex.url()} routeName="announce.index">
            <LuMegaphone size={18} /> Announcement
          </SidebarLink>

          <SidebarLink href="#" routeName="settings.index">
            <LuCog size={18} /> Settings
          </SidebarLink>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
