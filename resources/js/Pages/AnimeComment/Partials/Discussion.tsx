import { useEffect, useRef, useState } from "react";
import { Form, Link, router, usePage } from "@inertiajs/react";
import { LuHeart, LuReply } from "react-icons/lu";
import { store } from "../../../actions/App/Http/Controllers/CommentController";
import { getAnimeComment } from "../../../actions/App/Http/Controllers/CommentController";

import QuoteBlock from "./QuoteBlock";
import FormComment from "./FormComment";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";
import { upvote } from "../../../actions/App/Http/Controllers/CommentController";

type DiscussionProps = {
  anime: App.DTOs.AnimeData;
  paginatedComment: App.DTOs.PaginatedCommentData;
  sortBy: "latest" | "most-loved" | "oldest";
};

const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString.replace(" ", "T"));
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (Number.isNaN(diffInSeconds) || diffInSeconds < 0) {
    return "just now";
  }

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

const Discussion = ({ anime, paginatedComment, sortBy }: DiscussionProps) => {
  const { auth } = usePage().props;
  const isGuest = !auth.user;

  // Local comment state, owns display order for this session
  const [comments, setComments] = useState(paginatedComment.data);

  // Tracks in-flight upvote requests to prevent useEffect from clobbering
  // optimistic state when Inertia pushes new props mid-request
  const isUpvoting = useRef(false);

  // Sync from server props only when it's NOT an upvote response
  // (e.g. sort changed, page changed, or initial load)
  useEffect(() => {
    if (!isUpvoting.current) {
      setComments(paginatedComment.data);
    }
  }, [paginatedComment.data]);

  const handleFilter = (filter: string) => {
    router.get(
      getAnimeComment.url(anime.slug),
      { sort: filter },
      { preserveScroll: true },
    );
  };

  const handleUpvote = (commentId: number) => {
    if (isGuest) return;

    // snapshot current state for rollback
    const previousComments = comments;

    // optimistic update, mutate count/flag, keep array order stable
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              upvotes: c.isUpvoted ? c.upvotes - 1 : c.upvotes + 1,
              isUpvoted: !c.isUpvoted,
            }
          : c,
      ),
    );

    isUpvoting.current = true;

    router.put(
      upvote.url({ commentId }),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          const serverComments = (
            page.props as unknown as {
              paginatedComment: App.DTOs.PaginatedCommentData;
            }
          ).paginatedComment.data;

          setComments((prev) =>
            prev.map((local) => {
              const fromServer = serverComments.find((s) => s.id === local.id);
              return fromServer ?? local;
            }),
          );
        },
        onError: () => {
          setComments(previousComments);
        },
        onFinish: () => {
          isUpvoting.current = false;
        },
      },
    );
  };

  return (
    <section id="discussion">
      <Link
        href={show.url(anime.slug)}
        className="text-primary text-lg font-semibold"
      >
        {anime.title_english || anime.title} - Discussion
      </Link>

      <FormComment isGuest={isGuest} anime={anime} />

      <div className="mt-4 mb-4 flex items-center gap-1 text-xs font-semibold">
        <button
          onClick={() => handleFilter("most-loved")}
          className={`${sortBy === "most-loved" ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-alt hover:text-text"} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
        >
          Most Loved
        </button>
        <button
          onClick={() => handleFilter("latest")}
          className={`${sortBy === "latest" ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-alt hover:text-text"} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
        >
          Latest
        </button>
        <button
          onClick={() => handleFilter("oldest")}
          className={`${sortBy === "oldest" ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-alt hover:text-text"} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
        >
          Oldest
        </button>
      </div>

      {comments?.map((comment, index) => (
        <div
          key={comment.id}
          className="border-border bg-surface mt-3 divide-y rounded border"
        >
          <div className="flex gap-4 px-4 py-3">
            {/* Upvote Column */}
            <div
              onClick={() => handleUpvote(comment.id)}
              className="flex shrink-0 flex-col items-center pt-0.5"
            >
              <button
                className={`-m-2 flex flex-col items-center gap-1 rounded-md p-2 transition-colors hover:cursor-pointer ${
                  comment.isUpvoted
                    ? "text-accent-red hover:text-accent-red/80"
                    : "text-text-muted hover:text-accent-red"
                }`}
              >
                <LuHeart
                  className={`size-4 ${comment.isUpvoted ? "fill-current" : ""}`}
                />
                <span className="text-xs leading-none">{comment.upvotes}</span>
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-primary text-sm font-semibold">
                  {comment.user?.name}
                </span>
                <span
                  className="text-text-muted text-xs"
                  suppressHydrationWarning
                >
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>

              {index === 1 && (
                <QuoteBlock
                  authorName="John Doe"
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. The animation in episode 3 was genuinely peak."
                />
              )}

              <p className="text-text mt-1 text-xs leading-relaxed whitespace-pre-wrap md:text-sm">
                {comment.body}
              </p>
              <button className="text-text-muted hover:text-text mt-2 flex items-center gap-1 text-xs hover:cursor-pointer">
                <LuReply className="size-3" /> Reply
              </button>
              {/* Reply comment form */}
              <div className="bg-surface-alt mt-2 hidden rounded p-3">
                <Form
                  action={store.url()}
                  method="post"
                  disableWhileProcessing
                  resetOnSuccess
                >
                  <input type="hidden" name="slug" value={anime.slug} />
                  <textarea
                    name="body"
                    placeholder="Write your reply here..."
                    className="text-text placeholder:text-text/50 min-h-17.5 w-full bg-transparent text-sm outline-hidden"
                    rows={4}
                    required
                  />
                  <p className="mt-1 text-xs font-medium text-red-500"></p>
                  <div className="border-border mt-2 flex justify-end border-t border-dashed pt-2">
                    <button
                      type="submit"
                      className="bg-primary text-primary-soft rounded-lg px-4 py-1.5 text-xs font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      Post Comment
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Discussion;
