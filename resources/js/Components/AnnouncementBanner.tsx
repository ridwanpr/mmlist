import { Link } from '@inertiajs/react';
import React from 'react';

interface Announcement {
  id: number;
  title: string;
}

interface Props {
  announcement: Announcement | null | undefined;
}

const AnnouncementBanner = ({ announcement }: Props) => {
  if (!announcement) return null;

  return (
    <Link
      href={`/announcement/${announcement.id}`}
      className="bg-primary hover:bg-primary-dark text-surface flex w-full items-center justify-center px-4 py-2.5 text-center text-sm font-medium transition-colors"
    >
      <span className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 11 18-5v12L3 14v-3z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
        <span>
          <span className="font-semibold">Update:</span> {announcement.title}
        </span>
        <span className="ml-1 underline underline-offset-2">Read details</span>
      </span>
    </Link>
  );
};

export default AnnouncementBanner;
