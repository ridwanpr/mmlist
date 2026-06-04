import { useState, useEffect, useSyncExternalStore } from 'react';
import type React from 'react';
import { router, useForm } from '@inertiajs/react';
import FrontLayout from '../../Layouts/FrontLayout';
import WatchlistTab from './Partials/WatchlistTab';
import { index as watchlistIndex } from '../../actions/App/Http/Controllers/WatchlistController';
import DetailModal from './Partials/DetailModal';
import DashContainer from '../UserDash/Partials/DashContainer';
import EditModal from './Partials/EditModal';
import AnimeList from './Partials/AnimeList';
import Pagination from '../../Components/UI/Pagination';
import { update as watchlistUpdate } from '../../actions/App/Http/Controllers/WatchlistController';
import { destroy as watchlistDelete } from '../../actions/App/Http/Controllers/WatchlistController';
import AppHead from '../../Components/AppHead';
import SortWatchlist from './Partials/SortWatchlist';
import AdvanceFilter from './Partials/AdvanceFilter';
import { LuList, LuLayoutGrid } from 'react-icons/lu';

type WatchlistPropsType = {
  watchlists: App.DTOs.PaginatedWatchlistData;
  status: string;
  tabCounts: {
    watching: number;
    completed: number;
    planned: number;
    on_hold: number;
    dropped: number;
  };
  averageScore: number | null;
  sortBy: 'latest' | 'score' | 'oldest';
  search: string | null;
  masterFilter: {
    genres: App.DTOs.GenreData[];
    themes: App.DTOs.ThemeData[];
    year: number[];
    type: string[];
    season: string[];
    rating: string[];
  };
};

export type EditWatchlistForm = {
  status: string;
  progress: number;
  score: number | null;
  note: string | null;
  started_at: string | null;
  completed_at: string | null;
};

// External store configuration to safely read localStorage in SSR environments
const subscribeViewMode = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener('watchlist_view_mode_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('watchlist_view_mode_updated', callback);
  };
};

const getViewModeSnapshot = () => {
  if (typeof window === 'undefined') return 'list';
  return localStorage.getItem('watchlist_view_mode') === 'grid' ? 'grid' : 'list';
};

const getServerViewModeSnapshot = () => 'list';

const Watchlist = ({
  watchlists,
  status,
  tabCounts,
  sortBy,
  search,
  masterFilter,
  averageScore,
}: WatchlistPropsType) => {
  const activeTab = status || 'all';

  const [searchQuery, setSearchQuery] = useState(search || '');
  const [selectedWatchlist, setSelectedWatchlist] = useState<App.DTOs.WatchlistData | null>(null);
  const [editWatchlist, setEditWatchlist] = useState<App.DTOs.WatchlistData | null>(null);

  const viewMode = useSyncExternalStore(
    subscribeViewMode,
    getViewModeSnapshot,
    getServerViewModeSnapshot,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((search || '') === searchQuery) return;

      const currentParams = Object.fromEntries(
        new URLSearchParams(window.location.search).entries(),
      );

      router.get(
        watchlistIndex.url(),
        {
          ...currentParams,
          search: searchQuery || undefined,
        },
        { preserveState: true, preserveScroll: true },
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, search]);

  const handleViewModeChange = (mode: 'list' | 'grid') => {
    localStorage.setItem('watchlist_view_mode', mode);
    window.dispatchEvent(new Event('watchlist_view_mode_updated'));
  };

  const handleChangeTab = (tab: string) => {
    const currentParams = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    router.get(watchlistIndex.url(), {
      ...currentParams,
      status: tab,
    });
  };

  const { data, setData, put } = useForm<EditWatchlistForm>({
    status: '',
    progress: 0,
    score: null,
    note: '',
    started_at: '',
    completed_at: '',
  });

  const handleEditWatchlist = (watchlist: App.DTOs.WatchlistData | null) => {
    setEditWatchlist(watchlist);
    if (watchlist) {
      setData({
        ...watchlist,
      });
    }
  };

  const incrementProgress = () => {
    setData(prev => {
      const maxEpisodes = editWatchlist?.episodes;
      if (maxEpisodes && Number(prev.progress) >= Number(maxEpisodes)) {
        return prev;
      }
      return {
        ...prev,
        progress: Number(prev.progress) + 1,
      };
    });
  };

  const handleSubmitEditWatchlist = (e: React.FormEvent<HTMLFormElement>, watchlistId: number) => {
    e.preventDefault();
    put(watchlistUpdate.url(watchlistId));
    setEditWatchlist(null);
  };

  const handleDeleteWatchlist = (watchlistId: number) => {
    if (confirm('Are you sure you want to remove this watchlist item?')) {
      router.delete(watchlistDelete.url(watchlistId));
    }
  };

  const handleFilter = (filter: 'latest' | 'score' | 'oldest') => {
    const currentParams = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    router.get(
      watchlistIndex.url(),
      {
        ...currentParams,
        sort: filter,
      },
      { preserveScroll: true },
    );
  };

  return (
    <>
      <AppHead title="Watchlist" />
      <DashContainer>
        <div className="mb-6 p-4 lg:p-0">
          <div className="flex items-center justify-between">
            <div className="mb-4">
              <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
                Watchlist
              </h1>
            </div>
          </div>

          <AdvanceFilter
            masterFilter={masterFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <WatchlistTab
            activeTab={activeTab}
            handleChangeTab={handleChangeTab}
            tabCounts={tabCounts}
          />

          <div className="mt-4">
            {/* Control bar */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <p className="text-text-muted text-xs font-medium">
                {watchlists?.total} Titles {averageScore !== null && `(Avg Score: ${averageScore})`}
              </p>

              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                <SortWatchlist sortBy={sortBy} handleFilter={handleFilter} />

                <div className="border-border bg-surface flex items-center rounded-lg border p-0.5 shadow-xs">
                  <button
                    onClick={() => handleViewModeChange('list')}
                    title="List View"
                    className={`cursor-pointer rounded-md p-1.5 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-primary text-surface-alt'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    <LuList size={16} />
                  </button>
                  <button
                    onClick={() => handleViewModeChange('grid')}
                    title="Grid Cover View"
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
            </div>

            <AnimeList
              watchlists={watchlists}
              viewMode={viewMode}
              setSelectedWatchlist={setSelectedWatchlist}
              handleEditWatchlist={handleEditWatchlist}
              handleDeleteWatchlist={handleDeleteWatchlist}
            />

            <Pagination links={watchlists.links} />
          </div>
        </div>

        <DetailModal
          selectedWatchlist={selectedWatchlist}
          setSelectedWatchlist={setSelectedWatchlist}
        />

        <EditModal
          editWatchlist={editWatchlist}
          handleEditWatchlist={handleEditWatchlist}
          data={data}
          setData={setData}
          incrementProgress={incrementProgress}
          handleSubmitEditWatchlist={handleSubmitEditWatchlist}
        />
      </DashContainer>
    </>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
