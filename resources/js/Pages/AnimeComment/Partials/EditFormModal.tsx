import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Form } from "@inertiajs/react";
import { useRef } from "react";
import {
  LuBold,
  LuCornerUpLeft,
  LuEyeOff,
  LuItalic,
  LuX,
} from "react-icons/lu";
import type { EditedComment } from "./Discussion";
import { update } from "../../../actions/App/Http/Controllers/CommentController";

type EditFormModalProps = {
  editModal: boolean;
  closeEditModal: () => void;
  editComment: EditedComment;
};

const EditFormModal = ({
  editModal,
  closeEditModal,
  editComment,
}: EditFormModalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after = "") => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    const selected = currentVal.slice(start, end);

    const next =
      currentVal.slice(0, start) +
      before +
      selected +
      after +
      currentVal.slice(end);

    textarea.value = next;

    const cursorPos =
      selected.length > 0
        ? end + before.length + after.length
        : start + before.length;

    textarea.focus();
    textarea.setSelectionRange(cursorPos, cursorPos);
  };

  return (
    <Dialog open={editModal} onClose={closeEditModal} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0"
      />

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
                Edit comment
              </DialogTitle>
            </div>
            <button
              onClick={closeEditModal}
              type="button"
              className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg p-1.5 transition-colors active:scale-95"
            >
              <LuX className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 pt-3">
            <Form
              action={update.url({ commentId: editComment.comment_id ?? "" })}
              method="put"
              disableWhileProcessing
              resetOnSuccess
              onFinish={closeEditModal}
              options={{
                preserveScroll: true,
              }}
            >
              <textarea
                ref={textareaRef}
                defaultValue={editComment.body}
                name="body"
                placeholder="Write your reply..."
                rows={4}
                autoFocus
                className="border-border bg-surface-alt text-text placeholder:text-text-muted focus:border-primary focus:ring-primary/30 w-full resize-none rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2"
                required
              />

              <div className="border-border/60 mt-3 flex items-center justify-between border-t border-dashed pt-2">
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => insertMarkdown("**", "**")}
                    className="border-border bg-background hover:bg-muted text-text rounded-md border px-2 py-1 text-xs font-semibold transition"
                  >
                    <LuBold />
                  </button>

                  <button
                    type="button"
                    onClick={() => insertMarkdown("*", "*")}
                    className="border-border bg-background hover:bg-muted text-text rounded-md border px-2 py-1 text-xs italic transition"
                  >
                    <LuItalic />
                  </button>

                  <button
                    type="button"
                    onClick={() => insertMarkdown("||", "||")}
                    className="border-border bg-background hover:bg-muted text-text rounded-md border px-2 py-1 text-xs transition"
                  >
                    <LuEyeOff />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={closeEditModal}
                    type="button"
                    className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-primary-soft cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditFormModal;
