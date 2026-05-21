import type { SetStateAction } from "react";
import { useImageProxy } from "../../../utils/image-proxy";

type AnimeListProps = {
  watchlists: App.DTOs.PaginatedWatchlistData;
  setSelectedWatchlist: React.Dispatch<
    SetStateAction<App.DTOs.WatchlistData | null>
  >;
  handleEditWatchlist: (watchlist: App.DTOs.WatchlistData | null) => void;
};

const AnimeList = ({
  watchlists,
  setSelectedWatchlist,
  handleEditWatchlist,
}: AnimeListProps) => {
  const { proxyImage } = useImageProxy();

  return (
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
                <button
                  onClick={() => handleEditWatchlist(watchlist)}
                  className="hover:text-text transition-colors hover:cursor-pointer"
                >
                  Edit
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
