import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { LuX, LuCornerUpLeft } from "react-icons/lu";
import type { RepliedComment } from "./Discussion";
import { Form } from "@inertiajs/react";
import { store } from "../../../actions/App/Http/Controllers/CommentController";

type ReplyFormModalProps = {
  replyModal: boolean;
  closeReplyModal: () => void;
  repliedComment: RepliedComment;
  slug: string;
};

const ReplyFormModal = ({
  replyModal,
  closeReplyModal,
  repliedComment,
  slug,
}: ReplyFormModalProps) => {
  return (
    <Dialog
      open={replyModal}
      onClose={closeReplyModal}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0"
      />

      {/* Mobile: bottom sheet — Desktop: centered modal */}
      <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:p-4">
        <DialogPanel
          transition
          className="bg-surface border-border flex w-full flex-col rounded-t-2xl border border-b-0 shadow-2xl transition duration-200 data-closed:translate-y-4 data-closed:opacity-0 sm:max-w-lg sm:rounded-2xl sm:border-b"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <LuCornerUpLeft className="text-primary size-4" />
              <DialogTitle className="text-text text-base font-semibold">
                Reply
              </DialogTitle>
            </div>
            <button
              type="button"
              onClick={closeReplyModal}
              className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg p-1.5 transition-colors active:scale-95"
            >
              <LuX className="size-4" />
            </button>
          </div>

          {/* Quoted comment */}
          <div className="border-border/50 bg-surface-alt/60 mx-5 mb-1 flex gap-3 rounded-xl border px-4 py-3">
            <div className="bg-primary/70 mt-0.5 w-0.5 shrink-0 rounded-full" />
            <div className="min-w-0">
              <p className="text-primary mb-1 text-xs font-semibold">
                {repliedComment.parent_comment_user}
              </p>
              <p className="text-text-muted line-clamp-3 text-sm leading-relaxed">
                {repliedComment.parent_comment_body}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 pt-3">
            <Form
              action={store.url()}
              method="post"
              disableWhileProcessing
              resetOnSuccess
            >
              <input
                type="hidden"
                name="parent_comment_id"
                value={repliedComment.parent_comment_id ?? ""}
              />
              <input type="hidden" name="slug" value={slug} />
              <textarea
                name="body"
                placeholder="Write your reply..."
                rows={4}
                autoFocus
                className="border-border bg-surface-alt text-text placeholder:text-text-muted focus:border-primary focus:ring-primary/30 w-full resize-none rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2"
              />

              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeReplyModal}
                  className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-soft cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95"
                >
                  Post reply
                </button>
              </div>
            </Form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReplyFormModal;
