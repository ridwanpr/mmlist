import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  LuX,
  LuCornerUpLeft,
  LuBold,
  LuItalic,
  LuEyeOff,
} from "react-icons/lu";
import { Form } from "@inertiajs/react";
import { useRef } from "react";
import type { RepliedComment } from "../../AnimeComment/Partials/Discussion";
import { store } from "../../../actions/App/Http/Controllers/TriggerCommentController";

type TriggerReplyModalProps = {
  replyModal: boolean;
  closeReplyModal: () => void;
  repliedComment: RepliedComment;
  triggerContentId: number;
};

const TriggerReplyModal = ({
  replyModal,
  closeReplyModal,
  repliedComment,
  triggerContentId,
}: TriggerReplyModalProps) => {
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
    <Dialog
      open={replyModal}
      onClose={closeReplyModal}
      className="relative z-50"
    >
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
              <div
                className="prose prose-sm text-text mt-1 mb-0 max-w-none text-xs whitespace-pre-wrap md:text-sm"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.classList.contains("spoiler")) {
                    target.classList.add("revealed");
                  }
                }}
                dangerouslySetInnerHTML={{
                  __html: repliedComment.parent_comment_body,
                }}
              />
            </div>
          </div>

          {/* Body */}
          <div className="p-5 pt-3">
            <Form
              action={store.url()}
              method="post"
              disableWhileProcessing
              resetOnSuccess
              onFinish={closeReplyModal}
              options={{
                preserveScroll: true,
              }}
            >
              <input
                type="hidden"
                name="parent_comment_id"
                value={repliedComment.parent_comment_id ?? ""}
              />
              <input
                type="hidden"
                name="commentable_id"
                value={triggerContentId ?? ""}
              />
              <textarea
                ref={textareaRef}
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
              </div>
            </Form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TriggerReplyModal;
