import { useForm, usePage, Link } from "@inertiajs/react";
import type React from "react";
import { store as storeComment } from "../../../actions/App/Http/Controllers/CommentController";
import { LuHeart, LuMessageSquarePlus } from "react-icons/lu";
import { getAnimeComment } from "../../../actions/App/Http/Controllers/CommentController";

type CommentProps = {
  anime: App.DTOs.AnimeData;
  topComments: App.DTOs.CommentData[] | null;
  countComments: number;
};

const Comment = ({ anime, topComments, countComments }: CommentProps) => {
  const { auth } = usePage().props;
  const { data, setData, post, errors, reset } = useForm({
    slug: anime.slug,
    body: "",
  });

  const handleCommentSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(storeComment.url(), {
      preserveScroll: true,
      onSuccess: () => reset("body"),
    });
  };

  const isButtonDisabled = data.body.trim().length < 3;

  return (
    <section className="border-border mt-6 border-t pt-5">
      <h2 className="text-text mb-2 text-base font-bold">Comments</h2>

      {/* Comments Preview List */}
      <div className="bg-surface space-y-1 rounded-lg px-4">
        {topComments && topComments.length > 0 ? (
          topComments.map((comment, i) => (
            <div
              key={comment.id}
              className={`py-2.5 ${i < topComments.length - 1 ? "border-border border-b" : ""}`}
            >
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-text text-sm font-bold">
                  {comment.user?.name}
                </span>
                <span className="text-text-muted text-[11px]">
                  {comment.createdAt.toString()}
                </span>
                <span className="text-text-muted ml-auto flex items-center gap-1 text-[11px]">
                  <LuHeart className="size-4" />
                  {comment.upvotes - comment.downvotes}
                </span>
              </div>

              {/* Comment Body */}
              <div
                className="prose prose-sm text-text/85 mt-1 max-w-none md:text-sm"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.classList.contains("spoiler")) {
                    target.classList.add("revealed");
                  }
                }}
                dangerouslySetInnerHTML={{
                  __html: comment.bodyHtml,
                }}
              />
            </div>
          ))
        ) : (
          <div className="border-border bg-surface/30 flex flex-col items-center justify-center rounded-lg px-4 py-8 text-center">
            <LuMessageSquarePlus className="text-text-muted/60 mb-2 size-6" />
            <p className="text-text-muted text-sm">
              No comments yet.{" "}
              {auth.user ? (
                <span className="text-primary font-medium">
                  Be the first to share your thoughts below!
                </span>
              ) : (
                <span>Log in or register below to start the conversation!</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* View All Link */}
      <div className="border-border mt-4 border-t pt-3">
        <Link
          href={getAnimeComment.url(anime.slug)}
          prefetch
          className="text-primary text-sm font-bold hover:underline"
        >
          View all {countComments} comments
        </Link>
      </div>

      {/* Conditional Interface Placement */}
      {auth.user ? (
        <div className="border-border bg-surface mt-4 rounded-lg border p-3 shadow-xs">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={data.body}
              onChange={(e) => setData("body", e.target.value)}
              placeholder="Share your thoughts..."
              className="text-text placeholder:text-text/50 min-h-17.5 w-full resize-none bg-transparent text-sm outline-hidden"
              required
            />

            {errors.body && (
              <p className="mt-1 text-xs font-medium text-red-500">
                {errors.body}
              </p>
            )}

            <div className="border-border/60 mt-2 flex justify-end border-t border-dashed pt-2">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="bg-primary text-primary-soft rounded-lg px-4 py-1.5 text-xs font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Call to Action Box for Guest Users */
        <div className="border-border bg-surface/40 mt-4 rounded-lg border border-dashed p-6 text-center">
          <p className="text-text-muted text-sm">
            Want to join the discussion?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>{" "}
            or{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>{" "}
            to share your thoughts.
          </p>
        </div>
      )}
    </section>
  );
};

export default Comment;
