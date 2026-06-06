import type React from 'react';
import FrontLayout from '../../Layouts/FrontLayout';

interface Props {
  announcement: {
    id: number;
    title: string;
    body: string;
    created_at: string;
  };
}

const Show = ({ announcement }: Props) => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="bg-surface border-border rounded-xl border p-8 shadow-sm">
        <h1 className="text-text font-serif text-3xl font-bold">{announcement.title}</h1>
        <p className="text-text-muted mt-2 text-sm">Published on {announcement.created_at} </p>

        <hr className="border-border my-6" />

        <div className="text-text leading-relaxed whitespace-pre-wrap">{announcement.body}</div>
      </div>
    </div>
  );
};

Show.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Show;
