import { Link } from "@inertiajs/react";

import { useImageProxy } from "../../utils/image-proxy";

interface AnimeCardProps {
  animeData: App.DTOs.AnimeData;
}

const SEASON_ICON: Record<string, string> = {
  spring: "🌸",
  summer: "☀️",
  fall: "🍂",
  winter: "❄️",
};

const AnimeCard = ({ animeData }: AnimeCardProps) => {
  const { proxyImage } = useImageProxy();
  const season = animeData?.season?.toLowerCase();
  const seasonIcon = season ? (SEASON_ICON[season] ?? "") : "";

  const seasonYear = (() => {
    const s = season
      ? `${seasonIcon} ${season.charAt(0).toUpperCase() + season.slice(1)}`
      : "";
    const y = animeData?.year ? String(animeData.year) : "";
    if (s && y) return `${s} ${y}`;
    if (s) return s;
    if (y) return y;
    return null;
  })();

  const metaParts = [
    seasonYear,
    animeData?.episodes ? `${animeData.episodes} eps` : null,
    animeData?.type,
  ].filter(Boolean);

  const genres = animeData?.genres?.slice(0, 3) ?? [];

  return (
    <Link
      href={`/anime/${animeData.slug}`}
      className="group mb-4 block lg:mb-0"
    >
      <div className="bg-surface border-surface-alt group-hover:border-primary-soft flex min-h-40 overflow-hidden rounded-lg border transition duration-200 group-hover:shadow-sm">
        {/* Image Wrapper */}
        <div className="relative w-26.5 shrink-0 overflow-hidden">
          <img
            src={proxyImage(animeData?.images.jpg.image_url)}
            alt={animeData ? `${animeData.title} cover image` : ""}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Wrapper */}
        <div className="flex min-w-0 flex-1 flex-col p-3">
          {/* Title */}
          <p
            className="mb-1 line-clamp-2 pb-px text-sm leading-snug font-bold md:text-base"
            title={
              animeData?.titles?.find((t) => t.type === "English")?.title ||
              animeData?.titles?.[0]?.title
            }
          >
            {animeData?.titles?.find((t) => t.type === "English")?.title ||
              animeData?.titles?.[0]?.title}
          </p>

          {/* Meta — season+year · eps · type */}
          <div className="text-text/70 mb-1.5 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs">
            {metaParts.map((part, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="opacity-40">·</span>}
                {part}
              </span>
            ))}
          </div>

          {/* Genre pills */}
          {genres.length > 0 && (
            <div className="mb-1.5 flex flex-wrap gap-1">
              {genres.map((genre) => (
                <span
                  key={genre.name}
                  className="bg-surface-alt text-text/70 rounded-sm px-1.5 py-0.5 text-[10px]"
                >
                  {genre.name}
                </span>
              ))}
              {(animeData?.genres?.length ?? 0) > 3 && (
                <span className="text-text/40 py-0.5 text-[10px]">
                  +{animeData!.genres!.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-1 overflow-hidden">
            <span className="border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              Trigger
            </span>
            <span className="border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              Trigger
            </span>
            <span className="border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              +3
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
