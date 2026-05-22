import { useForm, usePage, Link } from "@inertiajs/react";
import type React from "react";
import { store as storeComment } from "../../../actions/App/Http/Controllers/CommentController";

const comments = [
  {
    user: "AnimeFanatic99",
    time: "2 days ago",
    up: 124,
    text: "Absolutely phenomenal. The animation quality is top-tier and the story kept me on the edge of my seat.",
  },
  {
    user: "SakuraDreamer",
    time: "1 week ago",
    up: 98,
    text: "I went in with moderate expectations but this completely blew me away. The OST alone is worth the watch.",
  },
  {
    user: "OtakuCritic",
    time: "3 weeks ago",
    up: 76,
    text: "Solid entry for the season. The world-building is where this show truly shines — every detail feels intentional.",
  },
  {
    user: "MangaFirst",
    time: "1 month ago",
    up: 54,
    text: "Read the manga twice before watching. The adaptation stays faithful in all the right ways.",
  },
  {
    user: "KiritoFan2009",
    time: "1 month ago",
    up: 41,
    text: "Episode 5 had me in tears. Not what I expected from episode one at all — this show really creeps up on you.",
  },
];

type CommentProps = {
  anime: App.DTOs.AnimeData;
};

const Comment = ({ anime }: CommentProps) => {
  const { auth } = usePage().props;
  const { data, setData, post, errors, reset } = useForm({
    slug: anime.slug,
    body: "",
  });

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(storeComment.url(), {
      preserveScroll: true,
      onSuccess: () => reset("body"),
    });
  };

  const isButtonDisabled = data.body.trim().length < 3;

  return (
    <section className="border-border mt-6 border-t pt-5">
      <h2 className="text-text mb-4 text-base font-bold">Discussion</h2>

      {/* Comments Preview List */}
      <div className="space-y-1">
        {comments.map((c, i) => (
          <div
            key={i}
            className={`py-2.5 ${i < comments.length - 1 ? "border-border/60 border-b" : ""}`}
          >
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-text text-sm font-bold">{c.user}</span>
              <span className="text-text-muted text-[11px]">{c.time}</span>
              <span className="text-text-muted ml-auto text-[11px]">
                ↑ {c.up}
              </span>
            </div>
            <p className="text-text/85 text-sm leading-snug">{c.text}</p>
          </div>
        ))}
      </div>

      {/* Conditional Interface Placement */}
      {auth.user ? (
        <div className="border-border bg-surface mt-6 rounded-lg border p-3 shadow-xs">
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
        <div className="border-border bg-surface/40 mt-6 rounded-lg border border-dashed p-6 text-center">
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

      {/* View All Link */}
      <div className="border-border mt-4 border-t pt-3">
        <a href="#" className="text-primary text-sm font-bold hover:underline">
          View all 847 comments →
        </a>
      </div>
    </section>
  );
};

export default Comment;
