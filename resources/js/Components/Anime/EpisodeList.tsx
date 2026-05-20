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

      <div className="border-border border-y">
        <Link
          href="#"
          className="border-border/60 hover:bg-surface-alt group flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-b-0"
        >
          <span className="text-text-muted w-9 shrink-0 text-[11px] font-semibold tabular-nums">
            EP 01
          </span>
          <span className="text-text flex-1 text-sm font-semibold">
            Shingeki no Kyojin Episode 1 Discussion
          </span>
          <span className="text-text-muted shrink-0 text-xs">14 comments</span>
          <span className="text-primary text-sm font-bold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            →
          </span>
        </Link>
        <Link
          href="#"
          className="border-border/60 hover:bg-surface-alt group flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-b-0"
        >
          <span className="text-text-muted w-9 shrink-0 text-[11px] font-semibold tabular-nums">
            EP 02
          </span>
          <span className="text-text flex-1 text-sm font-semibold">
            Shingeki no Kyojin Episode 2 Discussion
          </span>
          <span className="text-text-muted shrink-0 text-xs">8 comments</span>
          <span className="text-primary text-sm font-bold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            →
          </span>
        </Link>
        <Link
          href="#"
          className="border-border/60 hover:bg-surface-alt group flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-b-0"
        >
          <span className="text-text-muted w-9 shrink-0 text-[11px] font-semibold tabular-nums">
            EP 03
          </span>
          <span className="text-text flex-1 text-sm font-semibold">
            Shingeki no Kyojin Episode 3 Discussion
          </span>
          <span className="text-text-muted shrink-0 text-xs">22 comments</span>
          <span className="text-primary text-sm font-bold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            →
          </span>
        </Link>
        <Link
          href="#"
          className="border-border/60 hover:bg-surface-alt group flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-b-0"
        >
          <span className="text-text-muted w-9 shrink-0 text-[11px] font-semibold tabular-nums">
            EP 04
          </span>
          <span className="text-text flex-1 text-sm font-semibold">
            Shingeki no Kyojin Episode 4 Discussion
          </span>
          <span className="text-text-muted shrink-0 text-xs">31 comments</span>
          <span className="text-primary text-sm font-bold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            →
          </span>
        </Link>
        <Link
          href="#"
          className="border-border/60 hover:bg-surface-alt group flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-b-0"
        >
          <span className="text-text-muted w-9 shrink-0 text-[11px] font-semibold tabular-nums">
            EP 05
          </span>
          <span className="text-text flex-1 text-sm font-semibold">
            Shingeki no Kyojin Episode 5 Discussion
          </span>
          <span className="text-text-muted shrink-0 text-xs">19 comments</span>
          <span className="text-primary text-sm font-bold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            →
          </span>
        </Link>
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
