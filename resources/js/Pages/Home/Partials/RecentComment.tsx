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
    <div className="mb-8">
      <div className="mx-auto max-w-7xl p-4">
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">Recent Comments</h2>

        {/* Updated container to match the vertical flex list style of the Community page */}
        <div className="mt-4 flex flex-col gap-4">
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
                  className="group border-border bg-surface hover:bg-surface-alt flex h-full flex-col gap-3 rounded-xl border p-3 transition-colors duration-200 sm:flex-row md:p-4"
                  onClick={e => {
                    const target = e.target as HTMLElement;
                    if (target.classList.contains('spoiler')) {
                      target.classList.add('revealed');
                    }
                  }}
                >
                  {/* Anime Thumbnail Column */}
                  <div className="hidden shrink-0 sm:block">
                    <Link href={getAnimeComment.url({ animeSlug: animeSlug })}>
                      <img
                        src={comment.anime?.images?.webp?.small_image_url}
                        alt={comment.anime?.title}
                        className="h-16 w-12 rounded-sm object-cover shadow-xs"
                      />
                    </Link>
                  </div>

                  {/* Main Content Column */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Username & Timestamp Header */}
                    <div className="mb-1 flex items-baseline justify-between gap-2">
                      <span className="text-text truncate font-serif text-sm font-bold md:text-base">
                        {comment.user?.name || ''}
                      </span>
                      <span className="text-text-muted shrink-0 text-[11px]">
                        <TimeAgo dateString={comment.createdAt} />
                      </span>
                    </div>

                    {/* Breadcrumb Navigation Line */}
                    <nav className="text-text-muted mb-2 flex flex-wrap items-center gap-1 text-[11px] leading-tight font-medium md:text-xs">
                      <Link
                        href={getAnimeComment.url({ animeSlug: animeSlug })}
                        className="text-primary hover:text-primary max-w-full truncate transition-colors"
                      >
                        {comment.anime?.title_english || comment.anime?.title}
                      </Link>
                      {isTrigger && comment.commentable && 'name' in comment.commentable && (
                        <>
                          <span className="text-border px-0.5">/</span>
                          <Link
                            href={href}
                            className="hover:text-primary whitespace-nowrap transition-colors"
                          >
                            <span className="spoiler">{comment.commentable.name}</span>
                          </Link>
                        </>
                      )}
                    </nav>

                    {/* Parent Comment Quote Block */}
                    {comment.parent && (
                      <QuoteBlock
                        authorName={comment.parent.user?.name || ''}
                        body={comment.parent.bodyHtml}
                      />
                    )}

                    {/* Comment Body */}
                    <div
                      className="prose prose-sm text-text max-w-none font-sans text-xs leading-snug whitespace-pre-wrap md:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: comment.bodyHtml.trim(),
                      }}
                    />

                    {/* View Thread Footer Action */}
                    <div className="mt-2 pt-2">
                      <Link
                        href={href}
                        className="text-text-muted hover:text-primary inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase transition-colors md:text-xs"
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
