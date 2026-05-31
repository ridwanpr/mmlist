import { router, Link } from '@inertiajs/react';
import type React from 'react';
import BackLayout from '../../../Layouts/BackLayout';
import Pagination from '../../../Components/UI/Pagination';
import { LuTrash2 } from 'react-icons/lu';
import { destroy } from '../../../actions/App/Http/Controllers/Backend/ManageCommentController';

type CommentProps = {
  paginatedComments: App.DTOs.PaginatedCommentData;
};

const Comment = ({ paginatedComments }: CommentProps) => {
  const handleDelete = (e: React.SubmitEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this comment?')) {
      router.delete(destroy.url({ id: id }));
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-text font-serif text-2xl font-semibold">Manage Comments</h1>
          <p className="text-text-muted mt-0.5 text-sm">
            {paginatedComments.total} comment written
          </p>
        </div>
      </div>

      <div className="border-border bg-surface overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse text-left font-sans">
          <thead>
            <tr className="border-border bg-surface-alt text-text-muted border-b text-xs font-semibold tracking-wider uppercase">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Comment Content</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-border text-text divide-y text-sm">
            {paginatedComments.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-text-muted px-6 py-10 text-center">
                  No comments discovered in the database.
                </td>
              </tr>
            ) : (
              paginatedComments.data.map(comment => (
                <tr key={comment.id} className="hover:bg-surface-alt/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{comment.id}</td>
                  <td className="max-w-xl px-6 py-4">
                    <div
                      className="prose text-text wrap-break-word text-sm"
                      dangerouslySetInnerHTML={{ __html: comment.bodyHtml }}
                    />
                  </td>
                  <td className="text-text-muted px-6 py-4 whitespace-nowrap">
                    {comment.createdAt}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <form onSubmit={e => handleDelete(e, comment.id)} className="inline">
                      <button
                        type="submit"
                        className="bg-accent-red hover:bg-severity-high cursor-pointer rounded-full p-2.5 text-xs font-medium text-white transition-colors"
                      >
                        <LuTrash2 />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination links={paginatedComments.links} />
    </div>
  );
};

Comment.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default Comment;
