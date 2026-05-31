import type { SetStateAction } from 'react';
import { useImageProxy } from '../../../utils/image-proxy';
import { LuTrash2 } from 'react-icons/lu';
import { Link } from '@inertiajs/react';
import { show } from '../../../actions/App/Http/Controllers/AnimeController';

type AnimeListProps = {
  watchlists: App.DTOs.PaginatedWatchlistData;
  viewMode: 'list' | 'grid';
  setSelectedWatchlist: React.Dispatch<SetStateAction<App.DTOs.WatchlistData | null>>;
  handleEditWatchlist: (watchlist: App.DTOs.WatchlistData | null) => void;
  handleDeleteWatchlist: (watchlistId: number) => void;
};

const AnimeList = ({
  watchlists,
  viewMode,
  setSelectedWatchlist,
  handleEditWatchlist,
  handleDeleteWatchlist,
}: AnimeListProps) => {
  const { proxyImage } = useImageProxy();

  // Locked-Aspect Grid Layout (All info contained inside poster boundaries)
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {watchlists?.data.map(watchlist => (
          <div
            key={watchlist.id}
            className="border-border bg-surface-alt relative aspect-3/4 w-full overflow-hidden rounded-xl border shadow-xs"
          >
            {/* Background Poster Image */}
            <img
              src={proxyImage(watchlist.images?.jpg.image_url)}
              alt={`${watchlist.title} cover`}
              className="h-full w-full object-cover select-none"
              loading="lazy"
            />

            {/* Top Floating Utility Stats */}
            <div className="pointer-events-none absolute inset-x-2 top-2 z-10 flex items-center justify-between">
              <span className="rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                EP {watchlist.progress}
                {watchlist.episodes && `/${watchlist.episodes}`}
              </span>

              {watchlist.score && (
                <span className="bg-primary rounded px-1.5 py-0.5 text-[10px] font-bold text-surface-alt shadow-xs">
                  ★ {watchlist.score}
                </span>
              )}
            </div>

            {/* Bottom Info Overlay Block */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-linear-to-t from-black/95 via-black/80 to-transparent p-3 pt-14 text-white">
              {/* Title */}
              <Link
                href={show.url({ slug: watchlist.slug! })}
                className="hover:text-primary-soft line-clamp-2 font-sans text-xs leading-snug font-bold tracking-tight text-white"
              >
                {watchlist.title}
              </Link>

              {/* Release Year & Media Type */}
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/60">
                <span>{watchlist.year}</span>
                <span className="text-[8px] text-white/30 select-none">•</span>
                <span className="truncate font-semibold tracking-wider uppercase">
                  {watchlist.type}
                </span>
              </div>

              {/* Action Ribbon Panel */}
              <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[11px]">
                <div className="flex items-center gap-3 font-semibold text-white/80">
                  <button
                    onClick={() => setSelectedWatchlist(watchlist)}
                    className="cursor-pointer hover:text-white"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditWatchlist(watchlist)}
                    className="cursor-pointer hover:text-white"
                  >
                    Edit
                  </button>
                </div>
                <button
                  onClick={() => watchlist?.id && handleDeleteWatchlist(watchlist.id)}
                  title="Delete"
                  className="hover:text-accent-red cursor-pointer p-0.5 text-white/60"
                >
                  <LuTrash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Strip layout
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {watchlists?.data.map(watchlist => (
        <div
          key={watchlist.id}
          className="bg-surface border-border flex h-28 w-full overflow-hidden rounded-xl border transition-shadow hover:shadow-xs"
        >
          <img
            src={proxyImage(watchlist.images?.jpg.image_url)}
            alt={`${watchlist.title} cover`}
            className="xs:w-24 w-20 object-cover"
          />
          <div className="flex flex-1 flex-col justify-between p-2.5">
            <div>
              <Link
                href={show.url({ slug: watchlist.slug! })}
                className="text-primary line-clamp-1 font-sans text-sm leading-tight font-semibold tracking-tight"
              >
                {watchlist.title}
              </Link>
              <div className="text-text-muted mt-1 flex items-center gap-2 text-xs">
                <span>{watchlist.year}</span>
                <span className="text-border text-[10px]">•</span>
                <span className="truncate">{watchlist.type}</span>
              </div>
            </div>
            <div>
              <p className="text-text-muted flex items-center gap-2 text-xs">
                Personal Score: {watchlist.score || '-'}
              </p>
            </div>
            <div className="border-border/60 flex items-center justify-between border-t pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-text-muted">
                  Ep <strong className="text-text font-semibold">{watchlist.progress}</strong>
                  {watchlist.episodes && ` / ${watchlist.episodes}`}
                </span>
              </div>
              <div className="text-text-muted flex items-center gap-2.5 text-xs font-medium">
                <button
                  onClick={() => setSelectedWatchlist(watchlist)}
                  className="hover:text-text cursor-pointer transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditWatchlist(watchlist)}
                  className="hover:text-text cursor-pointer transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => watchlist?.id && handleDeleteWatchlist(watchlist.id)}
                  title="Delete"
                  className="cursor-pointer transition-colors hover:text-red-500"
                >
                  <LuTrash2 />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimeList;
