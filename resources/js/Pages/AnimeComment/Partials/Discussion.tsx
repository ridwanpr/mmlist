import { LuHeart, LuReply } from "react-icons/lu";

type DiscussionProps = {
  anime: App.DTOs.AnimeData;
  paginatedComment: App.DTOs.PaginatedCommentData;
};

const Discussion = ({ anime, paginatedComment }: DiscussionProps) => {
  return (
    <section id="discussion">
      <h1 className="text-text text-base font-semibold">
        {anime.title_english || anime.title} — Discussion
      </h1>

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
              <span className="text-text-muted text-xs leading-none">4</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-primary text-sm font-semibold">
                  {comment.user?.name}
                </span>
                <span className="text-text-muted text-xs">3 days ago</span>
              </div>
              <p className="text-text mt-1 text-sm leading-relaxed">
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
