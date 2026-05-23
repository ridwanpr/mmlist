import { LuHeart, LuReply } from "react-icons/lu";

type DiscussionProps = {
  anime: App.DTOs.AnimeData;
  paginatedComment: App.DTOs.PaginatedCommentData;
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

const Discussion = ({ anime, paginatedComment }: DiscussionProps) => {
  return (
    <section id="discussion">
      <h1 className="text-text text-base font-semibold">
        {anime.title_english || anime.title} - Discussion
      </h1>

      <div className="border-border border bg-surface my-3 rounded p-3 shadow-xs">
        <form>
          <textarea
            placeholder="Share your thoughts..."
            className="text-text placeholder:text-text/50 min-h-17.5 w-full resize-none bg-transparent text-sm outline-hidden"
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
        </form>
      </div>

      <div className="mt-4 mb-4 flex items-center gap-1 text-xs font-semibold">
        <button className="bg-primary-soft text-primary rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95">
          Latest
        </button>
        <button className="text-text-muted hover:bg-surface-alt hover:text-text rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95">
          Most Loved
        </button>
        <button className="text-text-muted hover:bg-surface-alt hover:text-text rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95">
          Oldest
        </button>
      </div>

      {paginatedComment.data?.map((comment) => (
        <div
          key={comment.id}
          className="border-border bg-surface mt-3 divide-y rounded border"
        >
          <div className="flex gap-4 px-4 py-3">
            <div className="flex shrink-0 flex-col items-center gap-0.5 pt-0.5">
              <button className="text-text-muted hover:text-text flex items-center text-xs">
                <LuHeart className="size-3.5" />
              </button>
              <span className="text-text-muted mt-1 text-xs leading-none">
                {comment.upvotes}
              </span>
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
              <p className="text-text mt-1 text-xs leading-relaxed md:text-sm">
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
