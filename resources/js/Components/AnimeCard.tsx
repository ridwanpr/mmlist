import { Link } from '@inertiajs/react';
import { useImageProxy } from '../utils/image-proxy';

interface AnimeCardProps {
  animeData: App.DTOs.AnimeData;
  index: number;
}

const AnimeCard = ({ animeData, index }: AnimeCardProps) => {
  const { proxyImage } = useImageProxy();

  const season = animeData?.season?.toLowerCase();
  const seasonYear = (() => {
    const s = season ? season.charAt(0).toUpperCase() + season.slice(1) : '';
    const y = animeData?.year ? String(animeData.year) : '';
    if (s && y) return `${s} ${y}`;
    if (s) return s;
    if (y) return y;
    return null;
  })();

  const genres = animeData?.genres?.slice(0, 2) ?? [];

  const title =
    animeData?.titles?.find(t => t.type === 'English')?.title ||
    animeData?.titles?.[0]?.title ||
    'Untitled';

  const studio = animeData?.studios?.[0]?.name || animeData?.source || '';
  const formatType = animeData?.type;
  const episodeCount = animeData?.episodes ? `${animeData.episodes} eps` : null;

  return (
    <Link
      href={`/anime/${animeData.slug}`}
      prefetch={['click']}
      className="group mb-4 block lg:mb-0"
    >
      <div className="border-border bg-surface relative flex h-48 overflow-hidden rounded-xl border transition-transform duration-150 ease-out group-hover:-translate-y-0.5">
        {/* Cover */}
        <div className="bg-surface-alt relative w-32 shrink-0 overflow-hidden">
          <img
            src={proxyImage(animeData?.images.webp.image_url || animeData?.images.jpg.image_url)}
            alt={title ? `${title} cover` : ''}
            decoding="async"
            loading={index >= 11 ? 'lazy' : 'eager'}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Box */}
        <div className="flex min-w-0 flex-1 flex-col p-3.5">
          {/* Title Header */}
          <h3
            className="text-text mb-2 line-clamp-1 font-sans text-sm font-bold tracking-tight md:text-[0.95rem]"
            title={title}
          >
            {title}
          </h3>

          {/* Vertical Metadata Stack */}
          <div className="text-text-muted flex flex-col gap-0.5 font-sans text-[11px] font-medium">
            {formatType && (
              <span className="text-primary font-semibold tracking-wider uppercase">
                {formatType}
              </span>
            )}
            {seasonYear && <span>{seasonYear}</span>}
            {episodeCount && <span>{episodeCount}</span>}
            {studio && (
              <span className="truncate" title={studio}>
                {studio}
              </span>
            )}
          </div>

          {/* Genres pinned cleanly to the bottom */}
          {genres.length > 0 && (
            <div className="mt-auto flex flex-wrap items-center gap-1.5">
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
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
