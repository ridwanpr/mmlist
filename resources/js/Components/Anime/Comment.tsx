import { LuArrowBigUp, LuChevronRight } from "react-icons/lu";

const comments = [
  {
    user: "AnimeFanatic99",
    avatar: "A",
    time: "2 days ago",
    up: 124,
    down: 4,
    text: "Absolutely phenomenal! The animation quality is top-tier and the story kept me on the edge of my seat the entire time.",
  },
  {
    user: "SakuraDreamer",
    avatar: "S",
    time: "1 week ago",
    up: 98,
    down: 7,
    text: "I went in with moderate expectations, but this completely blew me away.",
  },
  {
    user: "OtakuCritic",
    avatar: "O",
    time: "3 weeks ago",
    up: 76,
    down: 12,
    text: "Solid entry for the season. The world-building is where this show truly shines.",
  },
];

const Comment = () => {
  return (
    <section className="border-border mt-4 border-t pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-text font-bold">Top Comments</h2>

        <button className="text-primary hover:text-primary/80 group flex items-center gap-1 text-xs font-semibold transition">
          View All Comments
          <LuChevronRight
            className="transition-transform group-hover:translate-x-0.5"
            size={16}
          />
        </button>
      </div>

      <div className="flex flex-col">
        {comments.map((comment, i) => (
          <div key={i} className="border-border border-b py-4 last:border-b-0">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {comment.avatar}
                </div>

                <div className="min-w-0">
                  <div className="text-text truncate text-sm font-semibold">
                    {comment.user}
                  </div>

                  <div className="text-text-muted text-xs">{comment.time}</div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button className="text-text-muted flex items-center gap-1 text-sm transition hover:text-green-500">
                  <LuArrowBigUp size={18} />
                  <span>{comment.up}</span>
                </button>
              </div>
            </div>

            <p className="text-text/80 text-sm leading-relaxed">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comment;
