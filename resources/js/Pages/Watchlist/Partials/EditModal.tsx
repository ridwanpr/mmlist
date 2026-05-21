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
    { value: "planned", label: "Planned" },
    { value: "watching", label: "Watching" },
    { value: "completed", label: "Completed" },
    { value: "on_hold", label: "On hold" },
    { value: "dropped", label: "Dropped" },
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

      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="flex min-h-full items-end justify-center md:items-center">
          <DialogPanel className="bg-surface border-border flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-xl border shadow-lg">
            {/* Header */}
            <div className="border-border/60 flex items-center justify-between border-b p-5 pb-3">
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
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 overflow-y-auto p-5 pt-4">
                <div className="flex flex-col gap-4">
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
                      className="border-border bg-surface text-text hover:bg-surface-alt w-full rounded-lg border px-3 py-2.5 outline-none"
                    >
                      {statusSelectItem.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Progress */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="progress" className="text-sm">
                      Episode progress
                    </label>

                    <div className="relative flex items-center">
                      <input
                        type="number"
                        name="progress"
                        id="progress"
                        min={0}
                        value={data.progress}
                        onChange={(e) =>
                          setData("progress", Number(e.target.value))
                        }
                        className="border-border outline-primary w-full rounded-lg border px-3 py-2.5 pr-28"
                      />

                      <div className="absolute right-3 flex items-center gap-2">
                        {editWatchlist?.episodes && (
                          <p className="text-sm">/ {editWatchlist.episodes}</p>
                        )}

                        <button
                          type="button"
                          onClick={incrementProgress}
                          className="border-border rounded-full border p-2"
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div>
                    <label
                      htmlFor="score"
                      className="mb-1 block text-sm font-medium"
                    >
                      Score
                    </label>

                    <select
                      value={data.score?.toString() ?? ""}
                      onChange={(e) => setData("score", Number(e.target.value))}
                      name="score"
                      id="score"
                      className="border-border bg-surface text-text hover:bg-surface-alt w-full rounded-lg border px-3 py-2.5 outline-none"
                    >
                      <option value="">Select</option>

                      {scoreSelectItem.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="started_at" className="text-sm">
                        Start Date
                      </label>

                      <input
                        type="date"
                        id="started_at"
                        value={
                          data.started_at
                            ? new Date(data.started_at)
                                .toISOString()
                                .slice(0, 10)
                            : ""
                        }
                        onChange={(e) => setData("started_at", e.target.value)}
                        className="border-border outline-primary rounded-lg border px-3 py-2.5 text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="completed_at" className="text-sm">
                        Finish Date
                      </label>

                      <input
                        type="date"
                        id="completed_at"
                        value={
                          data.completed_at
                            ? new Date(data.completed_at)
                                .toISOString()
                                .slice(0, 10)
                            : ""
                        }
                        onChange={(e) =>
                          setData("completed_at", e.target.value)
                        }
                        className="border-border outline-primary rounded-lg border px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  {/* Note */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="note" className="text-sm">
                      Note
                    </label>

                    <textarea
                      rows={4}
                      value={data.note ?? ""}
                      id="note"
                      onChange={(e) => setData("note", e.target.value)}
                      className="border-border outline-primary rounded-lg border px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-surface border-border/60 sticky bottom-0 flex gap-3 border-t p-5">
                <button
                  type="button"
                  onClick={() => handleEditWatchlist(null)}
                  className="border-border text-text flex-1 rounded-lg border py-2 text-sm font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-primary text-surface flex-1 rounded-lg py-2 text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditModal;
