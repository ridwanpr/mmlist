import { LuBookmark, LuPlus, LuShare2 } from "react-icons/lu";
import ModalDialog from "../UI/ModalDialog";
import { SelectOption } from "../UI/SelectOption";
import type { SetStateAction } from "react";

export interface WatchlistFormData {
  animeId: number | string;
  userId: number | string;
  status: string;
  progress: number | "";
  score: number;
  note: string;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  scoreSelectItem: SelectItem[];
  statusSelectItem: SelectItem[];
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
                <button className="border-border rounded-full border p-2">
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
          {/*Note*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="score" className="text-sm">
              Note
            </label>
            <textarea
              rows={3}
              className="border-border outline-primary w-full rounded-lg border px-3 py-2.5 text-sm"
            ></textarea>
          </div>
        </div>
      </ModalDialog>

      <button className="text-primary border-primary-soft hover:bg-surface-alt flex w-full items-center justify-center gap-1.5 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition active:scale-95 sm:w-auto">
        <LuShare2 size={18} />
        Share
      </button>
    </div>
  );
};
