import type React from "react";
import { router, Link } from "@inertiajs/react";
import DashContainer from "../../Components/UserDash/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";
import WatchlistTab from "../../Components/Watchlist/WatchlistTab";
import { useImageProxy } from "../../utils/image-proxy";
import { index as watchlistIndex } from "../../actions/App/Http/Controllers/WatchlistController";

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
                      <span>2023</span>
                      <span className="text-border text-[10px]">•</span>
                      <span className="truncate">{watchlist.type}</span>
                    </div>
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
                      <button className="hover:text-text transition-colors">
                        View
                      </button>
                      <button className="hover:text-text transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {watchlists?.links && watchlists.links.length > 3 && (
            <div className="mt-8 flex justify-center gap-1">
              {watchlists.links.map((link, index) => {
                // If there is no URL (e.g. disabled prev/next buttons), render a span
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
                    // Laravel's paginator defaults use HTML elements like &laquo; and &raquo; for arrows
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashContainer>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
