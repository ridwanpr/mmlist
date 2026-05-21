import type React from "react";
import { router, useForm } from "@inertiajs/react";
import FrontLayout from "../../Layouts/FrontLayout";
import WatchlistTab from "./Partials/WatchlistTab";
import { index as watchlistIndex } from "../../actions/App/Http/Controllers/WatchlistController";
import { useState } from "react";
import DetailModal from "./Partials/DetailModal";
import DashContainer from "../UserDash/Partials/DashContainer";
import EditModal from "./Partials/EditModal";
import AnimeList from "./Partials/AnimeList";
import Pagination from "../../Components/UI/Pagination";

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
};

export type EditWatchlistForm = {
  animeId: string;
  userId: string;
  status: string;
  progress: number;
  score: number | null;
  note: string | null;
  started_at: string | null;
  completed_at: string | null;
};

const Watchlist = ({ watchlists, status, tabCounts }: WatchlistPropsType) => {
  const activeTab = status || "watching";

  const [selectedWatchlist, setSelectedWatchlist] =
    useState<App.DTOs.WatchlistData | null>(null);

  const [editWatchlist, setEditWatchlist] =
    useState<App.DTOs.WatchlistData | null>(null);

  const handleChangeTab = (tab: string) => {
    router.get(
      watchlistIndex.url({
        query: {
          status: tab,
        },
      }),
    );
  };

  const { data, setData } = useForm<EditWatchlistForm>({
    animeId: "",
    userId: "",
    status: "",
    progress: 0,
    score: null,
    note: "",
    started_at: "",
    completed_at: "",
  });

  const handleEditWatchlist = (watchlist: App.DTOs.WatchlistData | null) => {
    setEditWatchlist(watchlist);
    if (watchlist) {
      setData({
        ...watchlist,
      });
    }
  };

  return (
    <DashContainer>
      <div className="p-4 lg:p-0">
        <div className="mb-6">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Watchlist
          </h1>
          <p className="text-text-muted text-sm">
            {Object.values(tabCounts).reduce((a, b) => a + b, 0)} titles
          </p>
        </div>

        <WatchlistTab
          activeTab={activeTab}
          handleChangeTab={handleChangeTab}
          tabCounts={tabCounts}
        />

        <div className="mt-4">
          <p className="text-text-muted mb-4 text-xs">
            {watchlists?.total} Titles
          </p>

          {/*Anime List*/}
          <AnimeList
            watchlists={watchlists}
            setSelectedWatchlist={setSelectedWatchlist}
            handleEditWatchlist={handleEditWatchlist}
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
      />
    </DashContainer>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
