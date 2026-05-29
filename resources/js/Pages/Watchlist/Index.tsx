import { useState, useEffect } from 'react';
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
  sortBy: 'latest' | 'score' | 'oldest';
  search: string | null;
};

export type EditWatchlistForm = {
  status: string;
  progress: number;
  score: number | null;
  note: string | null;
  started_at: string | null;
  completed_at: string | null;
};

const Watchlist = ({ watchlists, status, tabCounts, sortBy, search }: WatchlistPropsType) => {
  const activeTab = status || 'watching';

  const [searchQuery, setSearchQuery] = useState(search || '');

  const [selectedWatchlist, setSelectedWatchlist] = useState<App.DTOs.WatchlistData | null>(null);
  const [editWatchlist, setEditWatchlist] = useState<App.DTOs.WatchlistData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((search || '') === searchQuery) return;

      router.get(
        watchlistIndex.url(),
        {
          status: status,
          sort: sortBy,
          search: searchQuery || undefined,
        },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        },
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleChangeTab = (tab: string) => {
    router.get(
      watchlistIndex.url({
        query: {
          status: tab,
          sort: sortBy,
          search: searchQuery || undefined,
        },
      }),
    );
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
    setData(prev => ({
      ...prev,
      progress: prev.progress + 1,
    }));
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
    router.get(
      watchlistIndex.url(),
      {
        status: status,
        sort: filter,
        search: searchQuery || undefined,
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
              <p className="text-text-muted text-sm">
                {Object.values(tabCounts).reduce((a, b) => a + b, 0)} titles
              </p>
            </div>
            <div>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                type="text"
                className="border-primary/50 bg-surface rounded-lg border p-2.5 text-xs"
                placeholder="Search anime title..."
              />
            </div>
          </div>

          <WatchlistTab
            activeTab={activeTab}
            handleChangeTab={handleChangeTab}
            tabCounts={tabCounts}
          />

          <div className="mt-4">
            <div className="mb-4 flex w-full items-center justify-between">
              <p className="text-text-muted text-xs">{watchlists?.total} Titles</p>
              <SortWatchlist sortBy={sortBy} handleFilter={handleFilter} />
            </div>

            {/*Anime List*/}
            <AnimeList
              watchlists={watchlists}
              setSelectedWatchlist={setSelectedWatchlist}
              handleEditWatchlist={handleEditWatchlist}
              handleDeleteWatchlist={handleDeleteWatchlist}
            />

            {/* Pagination */}
            <Pagination links={watchlists.links} />
          </div>
        </div>

        {/* View Watchlist */}
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
