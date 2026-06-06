import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

interface Announcement {
  id: number;
  title: string;
}

interface Props {
  announcement: Announcement | null | undefined;
}

const AnnouncementBanner = ({ announcement }: Props) => {
  // Initialize state based purely on what the server provided.
  // This guarantees SSR hydration matches perfectly.
  const [isVisible, setIsVisible] = useState(!!announcement);

  if (!isVisible || !announcement) return null;

  const handleDismiss = () => {
    // Hide immediately on the client
    setIsVisible(false);

    // Set a cookie valid for 30 days.
    // The server will read this on the next page request.
    document.cookie = `dismissed_announcement=${announcement.id}; path=/; max-age=${60 * 60 * 24 * 30}`;
  };

  return (
    <div className="bg-primary flex w-full items-center justify-between px-4 py-2.5 transition-colors">
      <div className="flex-1 text-center">
        <Link
          href={`/announcement/${announcement.id}`}
          onClick={handleDismiss} // Dismiss if they click to read it
          className="hover:text-surface-alt text-surface flex items-center justify-center gap-2 text-sm font-medium transition-colors"
        >
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
        </Link>
      </div>

      <button
        onClick={handleDismiss}
        className="text-surface hover:text-surface-alt ml-4 rounded-full p-1 outline-hidden transition-colors"
        aria-label="Dismiss announcement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBanner;
