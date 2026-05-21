import type React from "react";
import { router, Link } from "@inertiajs/react";
import DashContainer from "../../Components/UserDash/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";
import WatchlistTab from "../../Components/Watchlist/WatchlistTab";
import { useImageProxy } from "../../utils/image-proxy";
import { index as watchlistIndex } from "../../actions/App/Http/Controllers/WatchlistController";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { LuX } from "react-icons/lu";

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

const Watchlist = ({ watchlists, status, tabCounts }: WatchlistPropsType) => {
  const { proxyImage } = useImageProxy();
  const activeTab = status || "watching";

  const [selectedWatchlist, setSelectedWatchlist] =
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {watchlists?.data.map((watchlist) => (
              <div
                key={watchlist.id}
                className="bg-surface border-border flex h-28 w-full overflow-hidden rounded-xl border transition-shadow hover:shadow-sm"
              >
                <img
                  src={proxyImage(watchlist.images?.jpg.image_url)}
                  alt={`${watchlist.title} cover`}
                  className="xs:w-24 w-20 object-cover"
                />

                <div className="flex flex-1 flex-col justify-between p-2.5">
                  <div>
                    <p className="text-text line-clamp-1 font-sans text-sm leading-tight font-semibold tracking-tight">
                      {watchlist.title}
                    </p>
                    <div className="text-text-muted mt-1 flex items-center gap-2 text-xs">
                      <span>{watchlist.year}</span>
                      <span className="text-border text-[10px]">•</span>
                      <span className="truncate">{watchlist.type}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-text-muted flex items-center gap-2 text-xs">
                      Personal Score: {watchlist.score || "-"}
                    </p>
                  </div>

                  <div className="border-border/60 flex items-center justify-between border-t pt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-text-muted">
                        Ep{" "}
                        <strong className="text-text font-semibold">
                          {watchlist.progress}
                        </strong>
                        {watchlist.episodes && ` / ${watchlist.episodes}`}
                      </span>
                      <button className="text-primary hover:text-primary-dark font-medium transition-colors">
                        +1 ep
                      </button>
                    </div>

                    <div className="text-text-muted flex items-center gap-2.5 text-xs font-medium">
                      <button
                        onClick={() => setSelectedWatchlist(watchlist)}
                        className="hover:text-text transition-colors hover:cursor-pointer"
                      >
                        View
                      </button>
                      <button className="hover:text-text transition-colors hover:cursor-pointer">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {watchlists?.links && watchlists.links.length > 3 && (
            <div className="mt-8 flex justify-center gap-1">
              {watchlists.links.map((link, index) => {
                if (!link.url) {
                  return (
                    <span
                      key={index}
                      className="border-border text-text-muted/50 cursor-not-allowed rounded-lg border px-3 py-1.5 text-xs opacity-50"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  );
                }

                return (
                  <Link
                    key={index}
                    href={link.url}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      link.active
                        ? "bg-primary border-primary text-white"
                        : "border-border bg-surface text-text hover:bg-muted"
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* View Watchlist */}
      <Dialog
        open={selectedWatchlist !== null}
        onClose={() => setSelectedWatchlist(null)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="bg-surface border-border flex w-full max-w-md flex-col overflow-hidden rounded-xl border p-5 shadow-lg">
            {/* Header */}
            <div className="border-border/60 flex items-center justify-between border-b pb-3">
              <DialogTitle className="text-text font-serif text-lg font-semibold">
                Watchlist Info
              </DialogTitle>
              <button
                onClick={() => setSelectedWatchlist(null)}
                className="text-text-muted hover:text-text transition-colors hover:cursor-pointer"
              >
                <LuX className="size-5" />
              </button>
            </div>

            {/* Body Content */}
            {selectedWatchlist && (
              <div className="mt-4 space-y-5">
                <div>
                  <h3 className="text-text font-sans text-xl leading-tight font-bold tracking-tight">
                    {selectedWatchlist.title || "Untitled"}
                  </h3>
                  <div className="text-text-muted mt-1.5 flex items-center gap-2 text-xs font-medium">
                    <span className="uppercase">{selectedWatchlist.type}</span>
                    <span className="text-border text-[10px]">•</span>
                    <span>{selectedWatchlist.year || "N/A"}</span>
                  </div>
                </div>

                <div className="border-border/60 bg-muted/10 grid grid-cols-2 gap-4 rounded-xl border p-4 text-sm">
                  <div>
                    <span className="text-text-muted mb-0.5 block text-xs font-medium">
                      Status
                    </span>
                    <span className="text-text font-semibold capitalize">
                      {selectedWatchlist.status.replace("_", " ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted mb-0.5 block text-xs font-medium">
                      Progress
                    </span>
                    <span className="text-text font-semibold">
                      Ep {selectedWatchlist.progress}
                      {selectedWatchlist.episodes &&
                        ` / ${selectedWatchlist.episodes}`}
                    </span>
                  </div>
                  {selectedWatchlist.score !== null && (
                    <div className="border-border/40 col-span-2 mt-0.5 border-t pt-2.5">
                      <span className="text-text-muted mb-0.5 block text-xs font-medium">
                        Rating Score
                      </span>
                      <span className="text-text text-base font-bold">
                        {selectedWatchlist.score}{" "}
                        <span className="text-text-muted text-xs font-normal">
                          / 10
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                {(selectedWatchlist.started_at ||
                  selectedWatchlist.completed_at) && (
                  <div className="border-border/60 grid grid-cols-2 gap-4 border-t pt-4 text-xs">
                    {selectedWatchlist.started_at && (
                      <div>
                        <span className="text-text-muted mb-0.5 block font-medium">
                          Started Tracking
                        </span>
                        <span className="text-text font-medium">
                          {new Date(
                            selectedWatchlist.started_at,
                          ).toDateString()}
                        </span>
                      </div>
                    )}
                    {selectedWatchlist.completed_at && (
                      <div>
                        <span className="text-text-muted mb-0.5 block font-medium">
                          Finished Tracking
                        </span>
                        <span className="text-text font-medium">
                          {new Date(
                            selectedWatchlist.completed_at,
                          ).toDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes Section */}
                {selectedWatchlist.note && (
                  <div className="border-border/60 border-t pt-4">
                    <span className="text-text-muted mb-1.5 block text-xs font-medium">
                      Personal Notes
                    </span>
                    <div className="bg-muted/20 border-border/40 text-text rounded-xl border p-3.5 font-sans text-sm leading-relaxed whitespace-pre-wrap italic">
                      &quot;{selectedWatchlist.note}&quot;
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </DashContainer>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
