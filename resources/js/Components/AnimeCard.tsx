import { Link } from "@inertiajs/react";
import { useImageProxy } from "../utils/image-proxy";

interface AnimeCardProps {
  animeData: App.DTOs.AnimeData;
  index: number;
}

const AnimeCard = ({ animeData, index }: AnimeCardProps) => {
  const { proxyImage } = useImageProxy();

  const season = animeData?.season?.toLowerCase();

  const seasonYear = (() => {
    const s = season ? season.charAt(0).toUpperCase() + season.slice(1) : "";
    const y = animeData?.year ? String(animeData.year) : "";

    if (s && y) return `${s} ${y}`;
    if (s) return s;
    if (y) return y;

    return null;
  })();

  const genres = animeData?.genres?.slice(0, 2) ?? [];

  const metaParts = [
    seasonYear,
    animeData?.episodes ? `${animeData.episodes} eps` : null,
  ].filter(Boolean);

  const title =
    animeData?.titles?.find((t) => t.type === "English")?.title ||
    animeData?.titles?.[0]?.title ||
    "Untitled";

  const studio = animeData?.studios?.[0]?.name || animeData?.source || "";

  let yesVotes = 0;
  let noVotes = 0;

  animeData?.triggers?.forEach((trigger) => {
    if (trigger.is_appear) {
      yesVotes++;
    } else {
      noVotes++;
    }
  });

  const totalVotes = yesVotes + noVotes;

  const yesRatio = totalVotes > 0 ? yesVotes / totalVotes : 0;
  const hasTrigger = totalVotes > 0 && yesRatio >= 0.15;

  const getStatusStyle = () => {
    if (totalVotes === 0) {
      return {
        border: "border-border/60",
        text: "text-text-muted/70",
      };
    }

    if (!hasTrigger) {
      return {
        border: "border-success/30",
        text: "text-success",
      };
    }

    if (yesVotes < 3) {
      return {
        border: "border-severity-unverified/40",
        text: "text-severity-unverified",
      };
    }

    if (yesVotes < 7) {
      return {
        border: "border-severity-mild/40",
        text: "text-severity-mild",
      };
    }

    if (yesVotes < 13) {
      return {
        border: "border-severity-moderate/40",
        text: "text-severity-moderate",
      };
    }

    if (yesVotes < 25) {
      return {
        border: "border-severity-high/40",
        text: "text-severity-high",
      };
    }

    return {
      border: "border-severity-severe/50",
      text: "text-severity-severe",
    };
  };

  const statusStyle = getStatusStyle();

  return (
    <Link
      href={`/anime/${animeData.slug}`}
      prefetch={["click"]}
      className="group mb-4 block lg:mb-0"
    >
      <div className="border-border bg-surface relative flex h-48 overflow-hidden rounded-xl border transition-transform duration-150 ease-out group-hover:-translate-y-0.5">
        {/* Cover */}
        <div className="bg-surface-alt relative w-32 shrink-0 overflow-hidden">
          <img
            src={proxyImage(
              animeData?.images.webp.image_url ||
                animeData?.images.jpg.image_url,
            )}
            alt={title ? `${title} cover` : ""}
            decoding="async"
            loading={index >= 11 ? "lazy" : "eager"}
            className="h-full w-full object-cover"
          />

          {animeData?.type && (
            <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase">
              {animeData.type}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3.5">
          {/* Header */}
          <div className="space-y-1">
            <h3
              className="text-text line-clamp-1 font-sans text-sm font-bold tracking-tight md:text-[0.95rem]"
              title={title}
            >
              {title}
            </h3>

            <div className="text-text-muted flex flex-wrap items-center gap-x-1.5 font-sans text-[11px] font-medium">
              {metaParts.map((part, i) => (
                <span key={i} className="flex items-center">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="bg-border mx-1.5 h-1 w-1 shrink-0 rounded-full"
                    />
                  )}
                  {part}
                </span>
              ))}

              {studio && (
                <>
                  <span
                    aria-hidden="true"
                    className="bg-border mx-1.5 h-1 w-1 shrink-0 rounded-full"
                  />

                  <span className="max-w-30 truncate" title={studio}>
                    {studio}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {genres.map((g, i) => (
                <span
                  key={i}
                  className="bg-surface-alt text-text-muted border-border/60 rounded-md border px-2 py-0.5 font-sans text-[10px] font-semibold"
                >
                  {g.name}
                </span>
              ))}

              {(animeData?.genres?.length ?? 0) > 2 && (
                <span className="text-text-muted/50 pl-0.5 font-sans text-[10px] font-bold">
                  +{animeData.genres!.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div
            className={`bg-surface-alt/70 flex items-center justify-between rounded-lg border px-2.5 py-1.5 ${statusStyle.border}`}
          >
            <div className="flex min-w-0 flex-col">
              <span
                className={`font-sans text-[11px] font-bold tracking-tight ${statusStyle.text}`}
              >
                {totalVotes === 0 && "No Reports"}
                {totalVotes > 0 && !hasTrigger && "Voted Safe"}
                {hasTrigger && `${yesVotes} Trigger Reports`}
              </span>

              <span className="text-text-muted/60 mt-px truncate font-sans text-[10px]">
                {totalVotes === 0
                  ? "0 reports submitted"
                  : `From ${totalVotes.toLocaleString()} total votes`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
