import type React from 'react';
import BackLayout from '../../../Layouts/BackLayout';
import { Link } from '@inertiajs/react';

interface Announcement {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

interface Props {
  announcements: Announcement[];
}

const Index = ({ announcements = [] }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {/* View Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-text font-serif text-2xl font-semibold">Announcements</h1>
          <p className="text-text-muted mt-1 text-xs">
            Manage system announcements and broadcast messages to users.
          </p>
        </div>
        <Link
          href="/admin/announce/create"
          className="bg-primary hover:bg-primary-dark text-surface rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide shadow-xs transition-colors"
        >
          Create Announcement
        </Link>
      </div>

      {/* Main List Block */}
      <div className="bg-surface border-border rounded-xl border p-6">
        {announcements.length === 0 ? (
          <p className="text-text-muted py-4 text-center text-sm">
            No announcements have been published yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {announcements.map(announce => (
              <div
                key={announce.id}
                className="bg-surface-alt/40 border-border rounded-lg border p-5"
              >
                <h3 className="text-text font-serif text-lg font-medium">{announce.title}</h3>
                <p className="text-text-muted mt-2 text-sm whitespace-pre-wrap">{announce.body}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-text-muted text-xs">
                    Published on {new Date(announce.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Index.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default Index;
