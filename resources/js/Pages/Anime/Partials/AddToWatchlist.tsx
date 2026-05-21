import { LuBookmark, LuPlus } from "react-icons/lu";
import type { SetStateAction } from "react";
import type { FormDataConvertible } from "@inertiajs/core";
import ModalDialog from "../../../Components/UI/ModalDialog";
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

      <ModalDialog
        title="Add to Watchlist"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmitWatchlist}
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="border-border hover:bg-surface-alt flex-1 rounded-lg border py-2.5 font-medium transition-colors hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-surface hover:bg-primary-dark flex-1 rounded-lg py-2.5 font-medium transition-colors hover:cursor-pointer"
            >
              Submit
            </button>
          </>
        }
      >
        {/*Modal dialog children*/}
        <div className="flex flex-col gap-4">
          <SelectOption
            id="status"
            name="status"
            label="Status"
            items={statusSelectItem}
            onChange={handleWatchlistFormChange}
          />
          {/*Progress*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="progress" className="text-sm">
              Episode progress
            </label>
            <div className="relative flex items-center gap-1">
              <input
                type="number"
                name="progress"
                id="progress"
                min={0}
                value={watchlistFormData.progress}
                onChange={(e) => handleWatchlistFormChange(e)}
                className="border-border outline-primary w-full rounded-lg border px-3 py-2.5"
              />
              <div className="absolute right-4 flex items-center gap-1 md:right-10">
                {anime.episodes && <p>/ {anime.episodes} eps</p>}
                <button
                  type="button"
                  className="border-border rounded-full border p-2 hover:cursor-pointer"
                  onClick={(e) => incrementProgress(e)}
                >
                  <LuPlus />
                </button>
              </div>
            </div>
          </div>
          {/*Score*/}
          <div className="flex flex-col gap-1">
            <SelectOption
              id="score"
              name="score"
              label="Score"
              items={scoreSelectItem}
              onChange={handleWatchlistFormChange}
            />
          </div>
          {/* Dates (Started & Completed) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="started_at" className="text-sm">
                Start Date
              </label>
              <input
                type="date"
                name="started_at"
                id="started_at"
                value={watchlistFormData.started_at}
                onChange={handleWatchlistFormChange}
                className="border-border outline-primary w-full rounded-lg border px-3 py-2.5 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="completed_at" className="text-sm">
                Finish Date
              </label>
              <input
                type="date"
                name="completed_at"
                id="completed_at"
                value={watchlistFormData.completed_at}
                onChange={handleWatchlistFormChange}
                className="border-border outline-primary w-full rounded-lg border px-3 py-2.5 text-sm"
              />
            </div>
          </div>
          {/*Note*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="score" className="text-sm">
              Note
            </label>
            <textarea
              rows={3}
              name="note"
              id="note"
              className="border-border outline-primary w-full rounded-lg border px-3 py-2.5 text-sm"
              onChange={handleWatchlistFormChange}
            ></textarea>
          </div>
        </div>
      </ModalDialog>
    </div>
  );
};
