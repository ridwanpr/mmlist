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

const Comment = () => {
  return (
    <section className="border-border mt-6 border-t pt-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-text text-base font-bold">Discussion</h2>
        <a href="#" className="text-primary text-xs font-bold hover:underline">
          View all 847 →
        </a>
      </div>

      <div>
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

      <div className="border-border border-t pt-2.5">
        <a href="#" className="text-primary text-sm font-bold hover:underline">
          View all 847 comments →
        </a>
      </div>
    </section>
  );
};

export default Comment;
