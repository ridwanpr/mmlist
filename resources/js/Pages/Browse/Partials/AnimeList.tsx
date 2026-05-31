import { usePage, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AnimeCard from '../../../Components/AnimeCard';
import Pagination from '../../../Components/UI/Pagination';
import { settingIndex } from '../../../actions/App/Http/Controllers/UserDashboardController';
import { useImageProxy } from '../../../utils/image-proxy';
import { LuList, LuLayoutGrid } from 'react-icons/lu';
import { show } from '../../../actions/App/Http/Controllers/AnimeController';

interface AnimeListProps {
  animes: App.DTOs.PaginatedAnimeData;
}

const AnimeList = ({ animes }: AnimeListProps) => {
  const { auth } = usePage().props as any;
  const user = auth?.user;
  const { proxyImage } = useImageProxy();

  const [isNsfwRestricted, setIsNsfwRestricted] = useState(false);

  // Initialized to a safe default ('list') to ensure server and client match during hydration
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Read the client's preference strictly after the component mounts
  useEffect(() => {
    const savedView = localStorage.getItem('browse_view_mode');
    if (savedView === 'grid') {
      setViewMode('grid');
    }
  }, []);

  // Sync state changes back to localStorage
  useEffect(() => {
    localStorage.setItem('browse_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const hasNsfwParam = searchParams.get('rating') === 'Rx - Hentai';

      if (hasNsfwParam && (!user || user.show_nsfw !== true)) {
        setIsNsfwRestricted(true);
      } else {
        setIsNsfwRestricted(false);
      }
    }
  }, [user, animes]);

  return (
    <div className="text-text mx-auto max-w-7xl p-4 font-sans">
      {isNsfwRestricted ? (
        <div className="border-border bg-surface mx-auto my-6 max-w-md rounded-md border p-6 text-center">
          <h3 className="text-text mb-1 text-lg font-bold">NSFW Content Filter Active</h3>

          <p className="text-text-muted mb-4 text-sm">
            {!user
              ? 'You must have an account and enable the NSFW setting to view this rating.'
              : 'You need to update your preference to view content with this rating.'}
          </p>

          {!user ? (
            <div className="flex justify-center gap-3">
              <Link
                href="/login"
                className="bg-primary hover:bg-primary-dark text-surface rounded px-4 py-2 text-sm font-semibold transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-surface-alt text-text border-border rounded border px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <Link
              href={settingIndex.url()}
              className="bg-primary hover:bg-primary-dark text-surface inline-block rounded px-4 py-2 text-sm font-semibold transition-colors"
            >
              Open Settings
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Top Control Bar with Toggle */}
          <div className="mb-4 flex flex-row items-center justify-between gap-3">
            <p className="text-text font-semibold">{animes.total.toString()} anime found</p>

            <div className="border-border bg-surface flex w-max items-center rounded-lg border p-0.5 shadow-xs">
              <button
                onClick={() => setViewMode('list')}
                title="Default Card View"
                className={`cursor-pointer rounded-md p-1.5 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-surface-alt'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                <LuList size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Grid Poster View"
                className={`cursor-pointer rounded-md p-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-surface-alt'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                <LuLayoutGrid size={16} />
              </button>
            </div>
          </div>

          <div className="lg:flex lg:gap-4">
            <div className="w-full">
              {viewMode === 'list' ? (
                <div className="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {animes?.data &&
                    animes.data.map((anime, index) => (
                      <AnimeCard key={anime.mal_id} animeData={anime} index={index} />
                    ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {animes?.data &&
                    animes.data.map(anime => (
                      <Link
                        key={anime.mal_id}
                        href={show.url({ slug: anime.slug })}
                        className="group flex w-full flex-col"
                      >
                        {/* Poster Image Frame */}
                        <div className="bg-surface-alt relative aspect-3/4 w-full overflow-hidden rounded-xl shadow-xs transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-md">
                          <img
                            src={proxyImage(anime.images?.jpg?.image_url)}
                            alt={`${anime.title} cover`}
                            className="absolute inset-0 h-full w-full object-cover select-none"
                            loading="lazy"
                          />

                          {/* Top Utility Badges */}
                          <div className="pointer-events-none absolute top-2.5 left-2.5 z-10 flex items-center justify-start">
                            {anime.episodes ? (
                              <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                                {anime.episodes} EP
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-col px-0.5">
                          <h4 className="text-text group-hover:text-primary line-clamp-2 font-sans text-sm leading-snug font-semibold transition-colors duration-200">
                            {anime.title}
                          </h4>

                          {/* Primary Metadata */}
                          <div className="text-text-muted mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] font-medium">
                            <span>{anime.year || anime.season || 'TBA'}</span>
                            <span className="text-[8px] opacity-40 select-none">•</span>
                            <span className="tracking-wider uppercase">
                              {anime.type || 'Unknown'}
                            </span>
                            {anime.status && (
                              <>
                                <span className="text-[8px] opacity-40 select-none">•</span>
                                <span className="max-w-21.25 truncate">{anime.status}</span>
                              </>
                            )}
                          </div>

                          {/* Secondary Metadata (Genres / Studios) */}
                          {(anime.genres?.length > 0 || anime.studios?.length > 0) && (
                            <div className="border-border/50 mt-2 flex flex-col gap-y-0.5 border-t pt-2">
                              {anime.genres && anime.genres.length > 0 && (
                                <p className="text-text-muted/80 line-clamp-1 text-[11px]">
                                  {anime.genres.map(g => g.name).join(', ')}
                                </p>
                              )}
                              {anime.studios && anime.studios.length > 0 && (
                                <p className="text-text-muted/60 line-clamp-1 text-[10px] font-medium">
                                  {anime.studios.map(s => s.name).join(', ')}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <Pagination links={animes.links} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeList;
