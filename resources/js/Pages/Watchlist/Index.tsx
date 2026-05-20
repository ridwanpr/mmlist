import type React from "react";
import DashContainer from "../../Components/UserDash/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";
import { useState } from "react";
import WatchlistTab from "../../Components/Watchlist/WatchlistTab";
import { useImageProxy } from "../../utils/image-proxy";

type WatchlistPropsType = {
  watchlists: App.DTOs.PaginatedWatchlistData;
};

const Watchlist = ({ watchlists }: WatchlistPropsType) => {
  const { proxyImage } = useImageProxy();
  const [activeTab, setActiveTab] = useState("watching");

  return (
    <DashContainer>
      <div className="p-4 lg:p-0">
        <div className="mb-6">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Watchlist
          </h1>
          <p className="text-text-muted text-sm">27 titles</p>
        </div>

        <WatchlistTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-4">
          <p className="text-text-muted mb-4 text-xs">4 Titles</p>
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
                        <strong className="text-text font-semibold">14</strong>
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
        </div>
      </div>
    </DashContainer>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
