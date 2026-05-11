import React from "react";
import { LuBookmark, LuShare2 } from "react-icons/lu";

import TriggerWarning from "./TriggerWarning";

interface MainInfoProps {
  anime: App.DTOs.AnimeData;
}

const MetaList = ({
  items,
}: {
  items: { name: string }[] | null | undefined;
}) => {
  if (!items?.length) return <span className="text-text-muted italic">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, i) => (
        <span
          key={i}
          className="border-border bg-surface-alt text-text/80 inline-block rounded border px-1.5 py-0.5 text-[11px] leading-tight font-medium"
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

const MetaValue = ({ value }: { value: string | null | undefined }) =>
  value ? (
    <span className="text-text/90 text-sm font-semibold">{value}</span>
  ) : (
    <span className="text-text-muted italic">—</span>
  );

const MetaCell = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-text-muted text-[10px] font-bold tracking-widest uppercase">
      {label}
    </span>
    {children}
  </div>
);

const MainInfo = ({ anime }: MainInfoProps) => {
  const coverImage =
    anime.images?.webp?.image_url ?? anime.images?.jpg?.image_url;

  const displayTitle =
    anime.titles?.find((t) => t.type === "English")?.title ??
    anime.titles?.[0]?.title;

  const originalTitle =
    anime.titles?.find((t) => t.type === "Default")?.title ??
    anime.titles?.[0]?.title;

  const airedSeason =
    anime.season && anime.year
      ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`
      : (anime.year?.toString() ?? null);

  return (
    <div className="min-w-0 lg:col-span-3">
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Cover Image */}
        <div className="shrink-0">
          <img
            src={coverImage}
            alt="cover anime image"
            className="mx-auto w-40 rounded-lg object-cover shadow-sm md:w-56"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-text text-2xl leading-tight font-bold lg:text-3xl">
            {displayTitle}
          </h1>
          <p className="text-primary mb-1.5 text-sm font-semibold lg:text-base">
            {originalTitle}
          </p>

          {/* Badges */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
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
            {anime.genres?.map((g, i) => (
              <span
                key={i}
                className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium"
              >
                {g.name}
              </span>
            ))}
            {anime.episodes && (
              <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                {anime.episodes} Episodes
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mb-5 flex gap-2.5">
            <button className="bg-primary text-surface flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95">
              <LuBookmark size={18} />
              Add to Watchlist
            </button>
            <button className="text-primary border-primary-soft hover:bg-surface-alt flex items-center gap-1.5 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition active:scale-95">
              <LuShare2 size={18} />
              Share
            </button>
          </div>

          {/* Synopsis */}
          <p className="text-text/90 mb-5 text-sm leading-relaxed text-pretty md:text-[15px]">
            {anime.synopsis}
          </p>

          {/* Metadata grid */}
          <div className="border-border grid grid-cols-2 gap-x-4 gap-y-5 border-y py-4 sm:grid-cols-3">
            {/* Single-value fields */}
            <MetaCell label="Status">
              <MetaValue value={anime.status} />
            </MetaCell>

            <MetaCell label="Source">
              <MetaValue value={anime.source} />
            </MetaCell>

            <MetaCell label="Aired At">
              <MetaValue value={airedSeason} />
            </MetaCell>

            <MetaCell label="Rating">
              <MetaValue value={anime.rating} />
            </MetaCell>

            <MetaCell label="Duration">
              <MetaValue value={anime.duration} />
            </MetaCell>

            {/* Multi-value fields */}
            <MetaCell label="Studio">
              <MetaList items={anime.studios} />
            </MetaCell>

            <MetaCell label="Producers">
              <MetaList items={anime.producers} />
            </MetaCell>

            <MetaCell label="Themes">
              <MetaList items={anime.themes} />
            </MetaCell>

            <MetaCell label="Demographics">
              <MetaList items={anime.demographics} />
            </MetaCell>
          </div>
        </div>
      </div>

      <TriggerWarning />
    </div>
  );
};

export default MainInfo;
