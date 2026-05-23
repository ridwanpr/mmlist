import { Form, Link, router, usePage } from "@inertiajs/react";
import { LuHeart, LuReply } from "react-icons/lu";
import { store } from "../../../actions/App/Http/Controllers/CommentController";
import { getAnimeComment } from "../../../actions/App/Http/Controllers/CommentController";
import { login } from "../../../actions/App/Http/Controllers/AuthController";
import { register } from "../../../actions/App/Http/Controllers/AuthController";

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

  const handleFilter = (filter: string) => {
    router.get(getAnimeComment.url(anime.slug), { sort: filter });
  };

  return (
    <section id="discussion">
      <h1 className="text-text text-base font-semibold">
        {anime.title_english || anime.title} - Discussion
      </h1>

      <div className="border-border bg-surface my-3 rounded border p-3 shadow-xs">
        {isGuest ? (
          <div className="relative">
            <textarea
              disabled
              placeholder="Share your thoughts..."
              className="text-text placeholder:text-text/30 min-h-17.5 w-full cursor-not-allowed bg-transparent text-sm outline-hidden"
              rows={4}
            />
            <div className="bg-surface/80 absolute inset-0 flex flex-col items-center justify-center gap-2 rounded backdrop-blur-[2px]">
              <p className="text-text-muted text-xs font-medium">
                Join the discussion
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href={register.url()}
                  className="bg-primary text-primary-soft rounded px-4 py-1.5 text-xs font-semibold transition hover:opacity-90 active:scale-95"
                >
                  Register
                </Link>
                <span className="text-text-muted text-xs">or</span>
                <Link
                  href={login.url()}
                  className="border-border text-text-muted hover:bg-surface-alt hover:text-text rounded border px-4 py-1.5 text-xs font-semibold transition active:scale-95"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Form
            action={store.url()}
            method="post"
            disableWhileProcessing
            resetOnSuccess
          >
            <input type="hidden" name="slug" value={anime.slug} />
            <textarea
              name="body"
              placeholder="Share your thoughts..."
              className="text-text placeholder:text-text/50 min-h-17.5 w-full bg-transparent text-sm outline-hidden"
              rows={4}
              required
            />
            <p className="mt-1 text-xs font-medium text-red-500"></p>
            <div className="border-border/60 mt-2 flex justify-end border-t border-dashed pt-2">
              <button
                type="submit"
                className="bg-primary text-primary-soft rounded-lg px-4 py-1.5 text-xs font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
              >
                Post Comment
              </button>
            </div>
          </Form>
        )}
      </div>

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

      {paginatedComment.data?.map((comment) => (
        <div
          key={comment.id}
          className="border-border bg-surface mt-3 divide-y rounded border"
        >
          <div className="flex gap-4 px-4 py-3">
            {/* Upvote Column */}
            <div className="flex shrink-0 flex-col items-center pt-0.5">
              <button className="text-text-muted hover:text-accent-red -m-2 flex flex-col items-center gap-1 rounded-md p-2 transition-colors hover:cursor-pointer">
                <LuHeart className="size-4" />
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
              <p className="text-text mt-1 text-xs leading-relaxed whitespace-pre-wrap md:text-sm">
                {comment.body}
              </p>
              <button className="text-text-muted mt-2 flex items-center gap-1 text-xs">
                <LuReply className="size-3" /> Reply
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Discussion;
