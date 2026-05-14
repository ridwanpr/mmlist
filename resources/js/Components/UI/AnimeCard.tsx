import { Link } from "@inertiajs/react";
import { useImageProxy } from "../../utils/image-proxy";

interface AnimeCardProps {
  animeData: App.DTOs.AnimeData;
  index: number;
}

const SEASON_ICON: Record<string, string> = {
  spring: "🌸",
  summer: "☀️",
  fall: "🍂",
  winter: "❄️",
};

const AnimeCard = ({ animeData, index }: AnimeCardProps) => {
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

  const genres = animeData?.genres?.slice(0, 3) ?? [];

  const metaParts = [
    seasonYear,
    animeData?.episodes ? `${animeData.episodes} eps` : null,
    ...genres.map((g) => g.name),
  ].filter(Boolean);

  const title =
    animeData?.titles?.find((t) => t.type === "English")?.title ||
    animeData?.titles?.[0]?.title;

  return (
    <Link
      href={`/anime/${animeData.slug}`}
      className="group mb-4 block lg:mb-0"
    >
      <div className="border-border bg-surface group-hover:border-primary-soft relative flex min-h-44 overflow-hidden rounded-xl border transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_24px_-4px_rgba(179,77,86,0.18)]">
        <span
          aria-hidden="true"
          className="bg-primary pointer-events-none absolute inset-y-0 left-0 w-0.75 rounded-l-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* -- Image -- */}
        <div className="relative w-32 shrink-0 overflow-hidden">
          <img
            src={proxyImage(animeData?.images.jpg.image_url)}
            alt={animeData ? `${animeData.title} cover image` : ""}
            loading={index >= 6 ? "lazy" : "eager"}
            fetchPriority={index < 4 ? "high" : "auto"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent"
          />

          {/* Type badge — text-white/90 so it stays legible on dark overlay in both modes */}
          {animeData?.type && (
            <span className="absolute bottom-2 left-2 rounded-sm bg-black/55 px-1.5 py-0.75 text-[9px] font-semibold tracking-widest text-white/90 uppercase backdrop-blur-[2px]">
              {animeData.type}
            </span>
          )}
        </div>

        {/* -- Content -- */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
          {/* Title */}
          <p
            className="text-text line-clamp-2 pb-px text-sm leading-snug font-bold md:text-[0.9rem]"
            title={title}
          >
            {title}
          </p>

          {/* Meta - season · eps · genres (inline, low weight) */}
          {metaParts.length > 0 && (
            <div className="text-text-muted flex flex-wrap items-center gap-y-0.5 text-[11px]">
              {metaParts.map((part, i) => (
                <span key={i} className="flex items-center">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="bg-text-muted/40 mx-1.5 inline-block h-0.75 w-0.75 shrink-0 rounded-full"
                    />
                  )}
                  {part}
                </span>
              ))}
              {(animeData?.genres?.length ?? 0) > 3 && (
                <span className="text-text-muted/50 ml-0.5 text-[11px]">
                  &nbsp;+{animeData!.genres!.length - 3}
                </span>
              )}
            </div>
          )}

          {/* -- Trigger warning tags -- */}
          <div className="mt-auto flex flex-wrap gap-1">
            <span className="border-severity-high/40 bg-severity-high/10 text-severity-high w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              Gore
            </span>
            <span className="border-severity-severe/40 bg-severity-severe/10 text-severity-severe w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              Sexual Violence
            </span>
            <span className="border-severity-moderate/40 bg-severity-moderate/10 text-severity-moderate w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              Trauma
            </span>
            <span className="border-border text-text-muted w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              +2
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
