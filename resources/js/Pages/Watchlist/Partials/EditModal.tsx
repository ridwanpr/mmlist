import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { LuX } from "react-icons/lu";
import type { EditWatchlistForm } from "../Index";
import type { InertiaFormProps } from "@inertiajs/react";

type EditModalProps = {
  data: EditWatchlistForm;
  setData: InertiaFormProps<EditWatchlistForm>["setData"];
  editWatchlist: App.DTOs.WatchlistData | null;
  handleEditWatchlist: (watchlist: App.DTOs.WatchlistData | null) => void;
};

const EditModal = ({
  data,
  setData,
  editWatchlist,
  handleEditWatchlist,
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

          <form className="mt-4 flex flex-col gap-4">
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
