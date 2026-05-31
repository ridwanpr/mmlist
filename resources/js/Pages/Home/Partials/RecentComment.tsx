import { Link } from '@inertiajs/react';
import TimeAgo from '../../../Components/TimeAgo';
import { getAnimeComment } from '../../../actions/App/Http/Controllers/CommentController';
import { getTriggerComment } from '../../../actions/App/Http/Controllers/TriggerCommentController';
import QuoteBlock from '../../../Components/QuoteBlock';

type RecentCommentProps = {
  latestComments: App.DTOs.CommentData[];
};

const RecentComment = ({ latestComments }: RecentCommentProps) => {
  return (
    <div className="mb-4">
      <div className="mx-auto max-w-7xl p-3 sm:p-4">
        <h2 className="text-text font-serif text-base font-bold tracking-tight">Recent Comments</h2>

        <div className="mt-2.5 flex flex-col gap-2.5">
          {latestComments.map(comment => {
            const isTrigger = comment.commentableType !== 'anime';
            const animeSlug = comment.anime!.slug;

            const href = !isTrigger
              ? getAnimeComment.url({ animeSlug: animeSlug })
              : getTriggerComment.url({
                  animeslug: animeSlug,
                  triggerContentSlug: comment.commentable!.slug,
                });

            return (
              <div key={comment.id} className="w-full">
                <article
                  className="border-border bg-surface flex flex-col gap-1.5 rounded-lg border p-2.5 md:p-3"
                  onClick={e => {
                    const target = e.target as HTMLElement;
                    if (target.classList.contains('spoiler')) {
                      target.classList.add('revealed');
                    }
                  }}
                >
                  {/* Main Content Column */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Username & Timestamp Header */}
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-text truncate font-serif text-xs font-bold md:text-sm">
                        {comment.user?.name || ''}
                      </span>
                      <span className="text-text-muted shrink-0 text-[10px]">
                        <TimeAgo dateString={comment.createdAt} />
                      </span>
                    </div>

                    {/* Breadcrumb Navigation Line */}
                    <nav className="text-text-muted mb-1 flex flex-wrap items-center gap-1 text-[10px] leading-tight font-medium md:text-xs">
                      <Link
                        href={getAnimeComment.url({ animeSlug: animeSlug })}
                        className="text-primary max-w-full truncate hover:underline"
                      >
                        {comment.anime?.title_english || comment.anime?.title}
                      </Link>
                      {isTrigger && comment.commentable && 'name' in comment.commentable && (
                        <>
                          <span className="text-border px-0.5">/</span>
                          <Link
                            href={href}
                            className="hover:text-primary whitespace-nowrap hover:underline"
                          >
                            <span className="spoiler">{comment.commentable.name}</span>
                          </Link>
                        </>
                      )}
                    </nav>

                    {/* Parent Comment Quote Block */}
                    {comment.parent && (
                      <div className="mb-1">
                        <QuoteBlock
                          authorName={comment.parent.user?.name || ''}
                          body={comment.parent.bodyHtml.trim()}
                        />
                      </div>
                    )}

                    {/* Comment Body */}
                    <div
                      className="prose prose-sm text-text max-w-none font-sans text-[11px] leading-snug whitespace-pre-wrap md:text-xs"
                      dangerouslySetInnerHTML={{
                        __html: comment.bodyHtml.trim(),
                      }}
                    />

                    {/* View Thread Footer Action */}
                    <div className="mt-1">
                      <Link
                        href={href}
                        className="text-text-muted hover:text-primary inline-flex items-center gap-0.5 text-[9px] font-bold tracking-widest uppercase hover:underline md:text-[10px]"
                      >
                        View Thread <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentComment;
