import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { LuX } from "react-icons/lu";

type ReplyFormModalProps = {
  replyModal: boolean;
  handleReplyModal: () => void;
};

const ReplyFormModal = ({
  replyModal,
  handleReplyModal,
}: ReplyFormModalProps) => {
  return (
    <Dialog
      open={replyModal}
      onClose={() => handleReplyModal()}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-surface border-border w-full max-w-lg overflow-hidden rounded-lg border shadow-2xl">
          {/* Header */}
          <div className="border-border/60 flex items-center justify-between border-b px-5 py-4">
            <DialogTitle className="text-text text-lg font-semibold">
              Write your reply
            </DialogTitle>

            <button
              type="button"
              onClick={() => handleReplyModal()}
              className="text-text-muted hover:text-text cursor-pointer rounded-lg p-1 transition-colors hover:bg-white/5 active:scale-95"
            >
              <LuX className="size-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <form className="space-y-4">
              <textarea
                name="body"
                placeholder="Share your thoughts..."
                rows={5}
                required
                className="border-border bg-surface-alt text-text placeholder:text-text/45 focus:border-primary focus:ring-primary/40 min-h-32 w-full resize-none rounded-lg border px-4 py-3 text-sm transition outline-none focus:ring-2"
              />

              <div className="border-border/60 flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => handleReplyModal()}
                  className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition active:scale-95"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-primary text-primary-soft cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition hover:opacity-90 active:scale-95"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReplyFormModal;
