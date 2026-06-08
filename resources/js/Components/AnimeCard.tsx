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
      className="group mb-3 block lg:mb-0"
    >
      {/* Container */}
      <div className="border-border bg-surface hover:border-text-muted/30 relative flex h-36 overflow-hidden rounded-xl border transition-colors duration-100">
        {/* Cover */}
        <div className="bg-surface-alt relative w-24 shrink-0 overflow-hidden">
          <img
            src={proxyImage(animeData?.images.webp.image_url || animeData?.images.jpg.image_url)}
            alt={title ? `${title} cover` : ''}
            decoding="async"
            loading={index >= 11 ? 'lazy' : 'eager'}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Box */}
        <div className="flex min-w-0 flex-1 flex-col p-3">
          {/* Title Header */}
          <h3
            className="text-text mb-1.5 line-clamp-2 font-sans text-sm leading-tight font-bold tracking-tight md:text-[0.95rem]"
            title={title}
          >
            {title}
          </h3>

          <div className="flex flex-col gap-1 font-sans">
            {(formatType || episodeCount) && (
              <div className="flex items-center gap-2 text-[10px] leading-none font-medium">
                {formatType && (
                  <span className="text-primary font-bold tracking-wider uppercase">
                    {formatType}
                  </span>
                )}
                {formatType && episodeCount && (
                  <span className="bg-text-muted/20 h-2.5 w-px shrink-0" />
                )}
                {episodeCount && <span className="text-text-muted">{episodeCount}</span>}
              </div>
            )}

            {(seasonYear || studio) && (
              <div className="text-text-muted/80 flex items-center gap-2 text-[10px] leading-none font-medium">
                {seasonYear && <span>{seasonYear}</span>}
                {seasonYear && studio && (
                  <span className="bg-text-muted/20 h-2.5 w-px shrink-0" /> 
                )}
                {studio && (
                  <span className="text-text-muted/60 max-w-37.5 truncate" title={studio}>
                    {studio}
                  </span>
                )}
              </div>
            )}
          </div>

          {genres.length > 0 && (
            <div className="mt-auto flex flex-wrap items-center gap-1">
              {genres.map((g, i) => (
                <span
                  key={i}
                  className="bg-surface-alt text-text-muted border-border/50 rounded border px-1.5 py-0.5 font-sans text-[9px] font-semibold"
                >
                  {g.name}
                </span>
              ))}
              {(animeData?.genres?.length ?? 0) > 2 && (
                <span className="text-text-muted/40 pl-0.5 font-sans text-[9px] font-bold">
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
