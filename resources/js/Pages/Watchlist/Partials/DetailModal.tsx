import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { SetStateAction } from "react";
import type React from "react";
import { LuX } from "react-icons/lu";

type DetailModalProps = {
  selectedWatchlist: App.DTOs.WatchlistData | null;
  setSelectedWatchlist: React.Dispatch<
    SetStateAction<App.DTOs.WatchlistData | null>
  >;
};

const DetailModal = ({
  selectedWatchlist,
  setSelectedWatchlist,
}: DetailModalProps) => {
  return (
    <Dialog
      open={selectedWatchlist !== null}
      onClose={() => setSelectedWatchlist(null)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:p-4">
        <DialogPanel
          transition
          className="bg-surface border-border flex max-h-[85dvh] w-full flex-col rounded-t-2xl border border-b-0 shadow-2xl transition duration-200 data-closed:translate-y-4 data-closed:opacity-0 sm:max-w-md sm:rounded-2xl sm:border-b"
        >
          {/* Header */}
          <div className="border-border/60 flex items-center justify-between border-b px-5 py-4">
            <DialogTitle className="text-text font-serif text-lg font-semibold">
              Watchlist Info
            </DialogTitle>
            <button
              onClick={() => setSelectedWatchlist(null)}
              className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg p-1.5 transition-colors"
            >
              <LuX className="size-4" />
            </button>
          </div>

          {/* Body */}
          {selectedWatchlist && (
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div>
                <h3 className="text-text text-xl leading-tight font-bold tracking-tight">
                  {selectedWatchlist.title || "Untitled"}
                </h3>
                <div className="text-text-muted mt-1.5 flex items-center gap-2 text-xs font-medium">
                  <span className="uppercase">{selectedWatchlist.type}</span>
                  <span className="text-border text-[10px]">•</span>
                  <span>{selectedWatchlist.year || "N/A"}</span>
                </div>
              </div>

              <div className="border-border/60 bg-surface-alt grid grid-cols-2 gap-4 rounded-xl border p-4 text-sm">
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
                  <div className="border-border/40 col-span-2 border-t pt-3">
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
                        Started
                      </span>
                      <span className="text-text font-medium">
                        {new Date(selectedWatchlist.started_at).toDateString()}
                      </span>
                    </div>
                  )}
                  {selectedWatchlist.completed_at && (
                    <div>
                      <span className="text-text-muted mb-0.5 block font-medium">
                        Finished
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

              {selectedWatchlist.note && (
                <div className="border-border/60 border-t pt-4">
                  <span className="text-text-muted mb-1.5 block text-xs font-medium">
                    Personal notes
                  </span>
                  <div className="bg-surface-alt border-border/40 text-text rounded-xl border p-3.5 text-sm leading-relaxed whitespace-pre-wrap italic">
                    &quot;{selectedWatchlist.note}&quot;
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DetailModal;
