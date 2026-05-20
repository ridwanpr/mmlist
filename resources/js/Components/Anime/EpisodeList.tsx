import { Link } from "@inertiajs/react";

const EpisodeList = () => {
  return (
    <section className="border-border mt-6 border-t pt-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-text text-base font-bold">Episode Discussions</h2>
        <span className="text-text-muted text-[11px] font-semibold tracking-wider uppercase">
          24 Episodes
        </span>
      </div>

      <div className="border-border overflow-hidden rounded-lg border">
        {[
          { num: "EP 01", title: "To You, in 2000 Years", count: 14 },
          { num: "EP 02", title: "That Day", count: 8 },
          { num: "EP 03", title: "A Dim Light Amid Despair", count: 22 },
          {
            num: "EP 04",
            title: "Night of the Disbanding Ceremony",
            count: 31,
          },
          { num: "EP 05", title: "First Battle", count: 19 },
        ].map((ep) => (
          <Link
            key={ep.num}
            href="#"
            className="border-border/60 hover:bg-surface-alt group flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-b-0"
          >
            <span className="text-text-muted w-10 shrink-0 text-[11px] font-semibold tabular-nums">
              {ep.num}
            </span>
            <span className="text-text flex-1 text-sm font-semibold">
              {ep.title}
            </span>
            <span className="text-text-muted shrink-0 text-xs">
              {ep.count} comments
            </span>
            <span className="text-primary translate-x-0 text-sm font-bold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
              →
            </span>
          </Link>
        ))}
      </div>

      <a
        href="#"
        className="text-primary mt-3 inline-block text-xs font-bold hover:underline"
      >
        View all 24 episodes →
      </a>
    </section>
  );
};

export default EpisodeList;
