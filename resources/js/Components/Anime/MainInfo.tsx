import React from "react";
import {
  LuArrowBigDown,
  LuArrowBigUp,
  LuBookmark,
  LuChevronRight,
  LuShare2,
} from "react-icons/lu";

import { MetaInfo } from "./MetaInfo";

interface MainInfoProps {
  anime: App.DTOs.AnimeData;
}

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

const MainInfo = ({ anime }: MainInfoProps) => {
  const coverImage =
    anime.images?.webp?.image_url || anime.images?.jpg?.image_url || "";

  const displayTitle =
    anime.titles?.find((t) => t.type === "English")?.title ||
    anime.titles?.[0]?.title;

  const originalTitle =
    anime.titles?.find((t) => t.type === "Default")?.title ||
    anime.titles?.[0]?.title;

  const airedSeason =
    anime.season && anime.year
      ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`
      : anime.year
        ? anime.year.toString()
        : null;

  const metadata = (
    <>
      <MetaInfo label="Status" value={anime.status} />
      <MetaInfo label="Source" value={anime.source} />
      <MetaInfo label="Aired" value={airedSeason} />
      <MetaInfo label="Rating" value={anime.rating} />
      <MetaInfo label="Duration" value={anime.duration} />
      <MetaInfo label="Studio" items={anime.studios} />
      <MetaInfo label="Producers" items={anime.producers} />
      <MetaInfo label="Themes" items={anime.themes} />
      <MetaInfo label="Demographics" items={anime.demographics} />
    </>
  );

  return (
    <div className="min-w-0 lg:col-span-3">
      {/* MOBILE COVER */}
      <div className="mb-5 flex justify-center md:hidden">
        <img
          src={coverImage}
          alt="cover anime image"
          className="aspect-3/4 w-full max-w-60 rounded-xl object-cover shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-56 shrink-0 md:block">
          <img
            src={coverImage}
            alt="cover anime image"
            className="w-full rounded-xl object-cover shadow-sm"
          />

          <div className="border-border mt-4 border-t">{metadata}</div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex min-w-0 flex-1 flex-col">
          <h1 className="text-text text-2xl leading-tight font-bold lg:text-4xl">
            {displayTitle}
          </h1>

          <p className="text-primary mb-3 text-sm font-semibold lg:text-lg">
            {originalTitle}
          </p>

          {/* BADGES */}
          <div className="mb-5 flex flex-wrap items-center gap-1.5">
            {anime.type && (
              <span className="border-border bg-primary text-primary-soft rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase">
                {anime.type}
              </span>
            )}

            {airedSeason && (
              <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                {airedSeason}
              </span>
            )}

            {anime.genres?.map((genre, i) => (
              <span
                key={i}
                className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium"
              >
                {genre.name}
              </span>
            ))}

            {anime.episodes && (
              <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                {anime.episodes} Episodes
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mb-6 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
            <button className="bg-primary text-surface flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95 sm:w-auto">
              <LuBookmark size={18} />
              Add to Watchlist
            </button>

            <button className="text-primary border-primary-soft hover:bg-surface-alt flex w-full items-center justify-center gap-1.5 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition active:scale-95 sm:w-auto">
              <LuShare2 size={18} />
              Share
            </button>
          </div>

          {/* SYNOPSIS */}
          <section>
            <h2 className="text-text mb-2 text-lg font-bold">Synopsis</h2>

            <p className="text-text/90 text-sm leading-relaxed md:text-[15px]">
              {anime.synopsis}
            </p>
          </section>

          {/* MOBILE METADATA */}
          <div className="border-border mt-8 border-t md:hidden">
            {metadata}
          </div>

          {/* COMMENTS */}
          <section className="border-border mt-8 border-t pt-4">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-text text-lg font-bold">Top Comments</h2>

              <button className="text-primary hover:text-primary/80 group flex items-center gap-1 text-sm font-semibold transition">
                View All Comments
                <LuChevronRight
                  className="transition-transform group-hover:translate-x-0.5"
                  size={16}
                />
              </button>
            </div>

            <div className="flex flex-col">
              {comments.map((comment, i) => (
                <div
                  key={i}
                  className="border-border border-b py-4 last:border-b-0"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                        {comment.avatar}
                      </div>

                      <div className="min-w-0">
                        <div className="text-text truncate text-sm font-semibold">
                          {comment.user}
                        </div>

                        <div className="text-text-muted text-xs">
                          {comment.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <button className="text-text-muted flex items-center gap-1 text-sm transition hover:text-green-500">
                        <LuArrowBigUp size={18} />
                        <span>{comment.up}</span>
                      </button>

                      <button className="text-text-muted flex items-center gap-1 text-sm transition hover:text-red-500">
                        <LuArrowBigDown size={18} />
                        <span>{comment.down}</span>
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
        </main>
      </div>
    </div>
  );
};

export default MainInfo;
