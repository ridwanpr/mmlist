import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { LuBookmark, LuPlus, LuX } from "react-icons/lu";
import type { SetStateAction } from "react";
import type { FormDataConvertible } from "@inertiajs/core";
import { SelectOption } from "../../../Components/UI/SelectOption";

export interface WatchlistFormData {
  [key: string]: FormDataConvertible;
  animeId: number | string;
  userId: number | string;
  status: string;
  progress: number | "";
  score: number | "";
  note: string;
  started_at: string;
  completed_at: string;
}

type SelectItem = {
  value: string;
  label: string;
};

type AddToWatchlistProps = {
  anime: App.DTOs.AnimeData;
  watchlistFormData: WatchlistFormData;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  onSubmitWatchlist: (e: React.SubmitEvent<HTMLFormElement>) => void;
  handleWatchlistFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  scoreSelectItem: SelectItem[];
  statusSelectItem: SelectItem[];
  incrementProgress: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AddToWatchlist = ({
  anime,
  watchlistFormData,
  isOpen,
  setIsOpen,
  onSubmitWatchlist,
  handleWatchlistFormChange,
  scoreSelectItem,
  statusSelectItem,
  incrementProgress,
}: AddToWatchlistProps) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-surface flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 sm:w-auto"
      >
        <LuBookmark size={18} />
        Add to Watchlist
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
              <DialogTitle className="text-text text-lg font-semibold">
                Add to Watchlist
              </DialogTitle>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg p-1.5 transition-colors"
              >
                <LuX className="size-4" />
              </button>
            </div>

            <form
              onSubmit={onSubmitWatchlist}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-col gap-4">
                  <SelectOption
                    id="status"
                    name="status"
                    label="Status"
                    items={statusSelectItem}
                    onChange={handleWatchlistFormChange}
                  />

                  {/* Progress */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="progress" className="text-sm font-medium">
                      Episode progress
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        name="progress"
                        id="progress"
                        min={0}
                        value={watchlistFormData.progress}
                        onChange={handleWatchlistFormChange}
                        className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 pr-28 text-sm outline-hidden transition-colors"
                      />
                      <div className="absolute right-3 flex items-center gap-2">
                        {anime.episodes && (
                          <p className="text-text-muted text-sm">
                            / {anime.episodes}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={incrementProgress}
                          className="border-border hover:bg-surface-alt cursor-pointer rounded-full border p-1.5 transition-colors"
                        >
                          <LuPlus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <SelectOption
                    id="score"
                    name="score"
                    label="Score"
                    items={scoreSelectItem}
                    onChange={handleWatchlistFormChange}
                  />

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="started_at"
                        className="text-sm font-medium"
                      >
                        Start date
                      </label>
                      <input
                        type="date"
                        name="started_at"
                        id="started_at"
                        value={watchlistFormData.started_at}
                        onChange={handleWatchlistFormChange}
                        className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="completed_at"
                        className="text-sm font-medium"
                      >
                        Finish date
                      </label>
                      <input
                        type="date"
                        name="completed_at"
                        id="completed_at"
                        value={watchlistFormData.completed_at}
                        onChange={handleWatchlistFormChange}
                        className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                      />
                    </div>
                  </div>

                  {/* Note */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="note" className="text-sm font-medium">
                      Note
                    </label>
                    <textarea
                      rows={3}
                      name="note"
                      id="note"
                      onChange={handleWatchlistFormChange}
                      className="border-border bg-surface-alt text-text focus:border-accent-gold w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-border/60 flex gap-3 border-t p-5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border-border text-text hover:bg-surface-alt flex-1 cursor-pointer rounded-xl border py-2.5 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-surface flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-medium transition hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
