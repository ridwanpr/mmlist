import React from 'react';
import { Link } from '@inertiajs/react';
import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';
import TimeAgo from '../../Components/TimeAgo';
import { getAnimeComment } from '../../actions/App/Http/Controllers/CommentController';
import { getTriggerComment } from '../../actions/App/Http/Controllers/TriggerCommentController';
import Pagination from '../../Components/UI/Pagination';

type DiscussionListProps = {
  paginatedComments: App.DTOs.PaginatedCommentData;
};

const DiscussionList = ({ paginatedComments }: DiscussionListProps) => {
  return (
    <>
      <AppHead
        title="Community"
        meta="Join latest anime and trigger content warnings discussion and write comments on mamorulist"
      />

      <section className="bg-surface border-border border-b font-sans">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <h1 className="text-text mb-2 font-serif text-2xl font-bold">Community</h1>
          <p className="text-text-muted">
            Check latest comments and discussion from the community.
          </p>
        </div>
      </section>

      <section className="bg-background min-h-screen py-4 md:py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-4">
            {paginatedComments.data.map(comment => {
              const isTrigger = comment.commentableType === 'trigger_content';
              const animeSlug = comment.anime!.slug;

              const href = isTrigger
                ? getTriggerComment.url({
                    animeslug: animeSlug,
                    triggerContentSlug: comment.commentable!.slug,
                  })
                : getAnimeComment.url({ animeSlug: animeSlug });

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
                    {/* Anime Thumbnail */}
                    <div className="hidden shrink-0 sm:block">
                      <Link href={getAnimeComment.url({ animeSlug: animeSlug })}>
                        <img
                          src={comment.anime?.images.webp.small_image_url}
                          alt={comment.anime?.title}
                          className="h-16 w-12 rounded-sm object-cover shadow-xs"
                        />
                      </Link>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="mb-1 flex items-baseline justify-between gap-2">
                        <span className="text-text truncate font-serif text-sm font-bold md:text-base">
                          {comment.user?.name || ''}
                        </span>
                        <span className="text-text-muted shrink-0 text-[11px]">
                          <TimeAgo dateString={comment.createdAt} />
                        </span>
                      </div>

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
                              {comment.commentable.name}
                            </Link>
                          </>
                        )}
                      </nav>

                      {comment.parent && (
                        <div className="text-text-muted border-border/60 mb-2 border-l-2 pl-2 text-xs">
                          <span className="text-text font-semibold">
                            {comment.parent.user?.name || ''}
                          </span>
                          <div
                            className="mt-0.5 line-clamp-1 italic opacity-80"
                            dangerouslySetInnerHTML={{ __html: comment.parent.bodyHtml }}
                          />
                        </div>
                      )}

                      <div
                        className="prose prose-sm text-text max-w-none font-sans text-xs leading-snug whitespace-pre-wrap md:text-sm"
                        dangerouslySetInnerHTML={{
                          __html: comment.bodyHtml.trim(),
                        }}
                      />

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

          {/* Pagination */}
          <Pagination links={paginatedComments.links} />
        </div>
      </section>
    </>
  );
};

DiscussionList.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default DiscussionList;
