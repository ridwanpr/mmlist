import { useImageProxy } from '../../../utils/image-proxy';
import Comment from './Comment';
import { MetaInfo } from '../../../Components/MetaInfo';
import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import { AddToWatchlist } from './AddToWatchlist';
import type { WatchlistFormData } from './AddToWatchlist';
import { LuBookmarkX } from 'react-icons/lu';
import RelatedAnimeList from './RelatedAnimeList';

interface MainInfoProps {
  anime: App.DTOs.AnimeData;
  userWatchlist: App.DTOs.WatchlistData | null;
  topComments: App.DTOs.CommentData[] | null;
  countComments: number;
  animeRelation: App.DTOs.AnimeRelationData[];
}

type ActiveTab = 'synopsis' | 'relation';

const MainInfo = ({
  anime,
  userWatchlist,
  topComments,
  countComments,
  animeRelation,
}: MainInfoProps) => {
  const { auth, routes } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('synopsis');

  const { proxyImage } = useImageProxy();
  const coverImage = proxyImage(anime.images?.webp?.image_url || anime.images?.jpg?.image_url);

  const displayTitle =
    anime.titles?.find(t => t.type === 'English')?.title || anime.titles?.[0]?.title;

  const originalTitle =
    anime.titles?.find(t => t.type === 'Default')?.title || anime.titles?.[0]?.title;

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

  const statusSelectItem = [
    {
      value: 'planned',
      label: 'Planned',
    },
    {
      value: 'watching',
      label: 'Watching',
    },
    {
      value: 'completed',
      label: 'Completed',
    },
    {
      value: 'on_hold',
      label: 'On hold',
    },
    {
      value: 'dropped',
      label: 'Dropped',
    },
  ];

  const labels: Record<string, string> = {
    10: 'Masterpiece',
    9: 'Great',
    8: 'Very Good',
    7: 'Good',
    6: 'Fine',
    5: 'Average',
    4: 'Bad',
    3: 'Very Bad',
    2: 'Horrible',
    1: 'Appalling',
  };

  const scoreSelectItem = Array.from({ length: 10 }, (_, i) => {
    const score = String(10 - i);
    return {
      value: score,
      label: `(${score}) ${labels[score]}`,
    };
  });

  const [watchlistFormData, setWatchlistFormData] = useState<WatchlistFormData>({
    animeId: anime.mal_id,
    userId: auth.user?.id || '',
    status: 'planned',
    progress: '',
    score: '',
    note: '',
    started_at: '',
    completed_at: '',
  });

  const incrementProgress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWatchlistFormData((prev: WatchlistFormData) => {
      const current = prev.progress === '' ? 0 : Number(prev.progress);
      const next = current + 1;

      return {
        ...prev,
        progress: anime.episodes != null ? Math.min(next, anime.episodes) : next,
      };
    });
  };

  const onSubmitWatchlist = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post(routes['watchlist.store'], watchlistFormData, {
      preserveScroll: true,
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  const handleWatchlistFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const field = e.currentTarget.id;
    const rawValue = e.currentTarget.value;

    if (field === 'progress' || field === 'score') {
      if (rawValue === '') {
        setWatchlistFormData((prev: WatchlistFormData) => ({
          ...prev,
          [field]: '',
        }));
        return;
      }

      let numValue = Number(rawValue);

      if (isNaN(numValue)) return;

      if (anime.episodes != null && numValue > anime.episodes) {
        numValue = anime.episodes;
      }

      setWatchlistFormData(prev => ({
        ...prev,
        [field]: numValue,
      }));

      return;
    }

    setWatchlistFormData(prev => ({
      ...prev,
      [field]: rawValue,
    }));
  };

  const removeAnimeFromWatchlist = (watchlistId: number) => {
    const confirmed = window.confirm('Remove this anime from watchlist?');
    if (confirmed) {
      router.delete(`/watchlist/${watchlistId}`, {
        preserveScroll: true,
      });
    }
  };

  return (
    <div className="min-w-0 lg:col-span-3">
      {/* MOBILE COVER */}
      <div className="mt-3 mb-5 flex justify-center md:hidden">
        <img
          src={coverImage}
          alt="cover anime image"
          className="bg-surface aspect-3/4 w-full max-w-60 rounded-xl object-cover shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-56 shrink-0 md:block">
          <img
            src={coverImage}
            alt="cover anime image"
            className="bg-surface aspect-3/4 w-full rounded-xl object-cover shadow-sm"
          />

          <div className="border-border mt-4 border-t">{metadata}</div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex min-w-0 flex-1 flex-col">
          <h1 className="text-text/90 text-2xl leading-tight font-semibold lg:text-4xl">
            {displayTitle}
          </h1>

          <p className="text-primary mb-3 text-sm font-semibold lg:text-lg">{originalTitle}</p>

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
          {auth.user ? (
            <>
              {userWatchlist !== null ? (
                <div>
                  <button
                    onClick={() => removeAnimeFromWatchlist(userWatchlist.id!)}
                    className="border-primary text-primary mb-6 flex w-full items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 sm:w-auto md:w-fit"
                  >
                    <LuBookmarkX size={18} />
                    Remove from Watchlist
                  </button>
                </div>
              ) : (
                <AddToWatchlist
                  anime={anime}
                  watchlistFormData={watchlistFormData}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  onSubmitWatchlist={onSubmitWatchlist}
                  handleWatchlistFormChange={handleWatchlistFormChange}
                  scoreSelectItem={scoreSelectItem}
                  statusSelectItem={statusSelectItem}
                  incrementProgress={incrementProgress}
                />
              )}
            </>
          ) : (
            /* Call to Action Box for Guest Users to manage watchlist */
            <div className="border-border bg-surface/40 mb-6 rounded-lg border border-dashed p-4 text-center sm:text-left md:w-fit">
              <p className="text-text-muted text-sm">
                Want to track this anime?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Log in
                </Link>{' '}
                or{' '}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                  Register
                </Link>{' '}
                to manage your watchlist.
              </p>
            </div>
          )}

          {/* SYNOPSIS / RELATED ANIME SECTION */}
          <section className="space-y-4">
            {/* Segmented Switcher Container */}
            <div className="bg-surface-alt border-border inline-flex rounded-lg border p-1">
              <button
                onClick={() => setActiveTab('synopsis')}
                className={`${activeTab === 'synopsis' ? 'text-primary bg-surface' : 'text-text-muted'} rounded-md px-4 py-1.5 text-xs font-bold shadow-xs transition-all hover:cursor-pointer`}
              >
                Synopsis
              </button>
              <button
                onClick={() => setActiveTab('relation')}
                className={`${activeTab === 'relation' ? 'text-primary bg-surface' : 'text-text-muted'} rounded-md px-4 py-1.5 text-xs font-bold shadow-xs transition-all hover:cursor-pointer`}
              >
                Related Entries
              </button>
            </div>

            {/* Tab Content Display Area */}
            <div>
              {activeTab === 'synopsis' ? (
                <p className="text-text/90 font-sans text-sm leading-relaxed">{anime.synopsis}</p>
              ) : (
                <RelatedAnimeList animeRelations={animeRelation} />
              )}
            </div>
          </section>

          {/* MOBILE METADATA */}
          <div className="border-border mt-8 border-t md:hidden">{metadata}</div>

          {/* COMMENTS */}
          <Comment countComments={countComments} anime={anime} topComments={topComments} />
        </main>
      </div>
    </div>
  );
};

export default MainInfo;
