import { Link } from '@inertiajs/react';
import TimeAgo from '../../../Components/TimeAgo';
import { getAnimeComment } from '../../../actions/App/Http/Controllers/CommentController';
import { getTriggerComment } from '../../../actions/App/Http/Controllers/TriggerCommentController';

type RecentCommentProps = {
  latestComments: App.DTOs.CommentData[];
};

const RecentComment = ({ latestComments }: RecentCommentProps) => {
  return (
    <div className="mb-8">
      <div className="mx-auto max-w-7xl p-4">
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">Recent Comments</h2>

        <div className="bg-surface border-border divide-border mt-3 divide-y overflow-hidden rounded-xl border shadow-xs">
          {latestComments.map(comment => (
            <div
              key={comment.id}
              className="flex flex-col gap-1 px-5 py-3"
              onClick={e => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('spoiler')) {
                  target.classList.add('revealed');
                }
              }}
            >
              {/* Title & Timestamp */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link
                  href={
                    comment.commentableType === 'anime'
                      ? getAnimeComment.url({ animeSlug: comment.anime!.slug })
                      : getTriggerComment.url({
                          animeslug: comment.anime!.slug,
                          triggerContentSlug: comment.commentable!.slug,
                        })
                  }
                  className="text-primary cursor-pointer text-base font-bold transition-colors hover:underline"
                >
                  {comment.anime?.title_english || comment.anime?.title}
                  {comment.commentable && 'trigger_id' in comment.commentable && (
                    <span className="spoiler ml-1"> - {comment.commentable.name}</span>
                  )}
                </Link>
                <span className="text-text-muted text-xs">
                  <TimeAgo dateString={comment.createdAt} />
                </span>
              </div>

              <div className="text-text-muted text-xs">
                By{' '}
                <span className="text-text font-medium">{comment.user?.name || 'Anonymous'}</span>
              </div>

              {/* Comment Body */}
              <div
                className="prose prose-sm text-text mt-1 max-w-none text-xs whitespace-pre-wrap md:text-sm"
                dangerouslySetInnerHTML={{
                  __html: comment.bodyHtml.trim(),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentComment;
