import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { LuPlus, LuX } from "react-icons/lu";
import type { EditWatchlistForm } from "../Index";
import type { InertiaFormProps } from "@inertiajs/react";
import type React from "react";

type EditModalProps = {
  data: EditWatchlistForm;
  setData: InertiaFormProps<EditWatchlistForm>["setData"];
  editWatchlist: App.DTOs.WatchlistData | null;
  handleEditWatchlist: (watchlist: App.DTOs.WatchlistData | null) => void;
  incrementProgress: () => void;
  handleSubmitEditWatchlist: (
    e: React.SubmitEvent<HTMLFormElement>,
    watchlistId: number,
  ) => void;
};

const EditModal = ({
  data,
  setData,
  editWatchlist,
  handleEditWatchlist,
  incrementProgress,
  handleSubmitEditWatchlist,
}: EditModalProps) => {
  const statusSelectItem = [
    {
      value: "planned",
      label: "Planned",
    },
    {
      value: "watching",
      label: "Watching",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "on_hold",
      label: "On hold",
    },
    {
      value: "dropped",
      label: "Dropped",
    },
  ];

  const labels: Record<string, string> = {
    10: "Masterpiece",
    9: "Great",
    8: "Very Good",
    7: "Good",
    6: "Fine",
    5: "Average",
    4: "Bad",
    3: "Very Bad",
    2: "Horrible",
    1: "Appalling",
  };

  const scoreSelectItem = Array.from({ length: 10 }, (_, i) => {
    const score = String(10 - i);
    return {
      value: score,
      label: `(${score}) ${labels[score]}`,
    };
  });

  return (
    <Dialog
      open={editWatchlist !== null}
      onClose={() => handleEditWatchlist(null)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="bg-surface border-border flex w-full max-w-md flex-col overflow-hidden rounded-xl border p-5 shadow-lg">
          {/* Header */}
          <div className="border-border/60 flex items-center justify-between border-b pb-3">
            <DialogTitle className="text-text font-serif text-lg font-semibold">
              Edit Watchlist
            </DialogTitle>
            <button
              onClick={() => handleEditWatchlist(null)}
              className="text-text-muted hover:text-text transition-colors hover:cursor-pointer"
            >
              <LuX className="size-5" />
            </button>
          </div>

          <form
            onSubmit={(e) =>
              editWatchlist?.id &&
              handleSubmitEditWatchlist(e, editWatchlist.id)
            }
            className="mt-4 flex flex-col gap-4"
          >
            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium"
              >
                Status
              </label>
              <select
                value={data.status}
                onChange={(e) => setData("status", e.target.value)}
                name="status"
                id="status"
                className="border-border bg-surface text-text hover:bg-surface-alt w-full rounded-lg border px-3 py-2.5 outline-none hover:cursor-pointer"
              >
                {statusSelectItem.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
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
                  value={data.progress}
                  onChange={(e) => setData("progress", Number(e.target.value))}
                  className="border-border outline-primary w-full rounded-lg border px-3 py-2.5"
                />
                <div className="absolute right-4 flex items-center gap-1 md:right-10">
                  {editWatchlist?.episodes && (
                    <p>/ {editWatchlist.episodes} eps</p>
                  )}
                  <button
                    type="button"
                    className="border-border rounded-full border p-2 hover:cursor-pointer"
                    onClick={() => incrementProgress()}
                  >
                    <LuPlus />
                  </button>
                </div>
              </div>
            </div>
            {/* Score */}
            <div>
              <label htmlFor="score" className="mb-1 block text-sm font-medium">
                Score
              </label>
              <select
                value={data.score?.toString() ?? ""}
                onChange={(e) => setData("score", Number(e.target.value))}
                name="score"
                id="score"
                className="border-border bg-surface text-text hover:bg-surface-alt w-full rounded-lg border px-3 py-2.5 outline-none hover:cursor-pointer"
              >
                <option value="">Select</option>
                {scoreSelectItem.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Start and Finish Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="started_at" className="text-sm">
                  Start Date
                </label>
                <input
                  type="date"
                  name="started_at"
                  id="started_at"
                  value={
                    data?.started_at
                      ? new Date(data.started_at).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) => setData("started_at", e.target.value)}
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
                  value={
                    data?.completed_at
                      ? new Date(data.completed_at).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) => setData("completed_at", e.target.value)}
                  className="border-border outline-primary w-full rounded-lg border px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="border-border/60 mt-2 flex gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => handleEditWatchlist(null)}
                className="border-border hover:bg-muted/10 text-text flex-1 rounded-lg border py-2 text-sm font-medium transition-colors hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-surface flex-1 rounded-lg py-2 text-sm font-medium transition-opacity hover:cursor-pointer hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditModal;
