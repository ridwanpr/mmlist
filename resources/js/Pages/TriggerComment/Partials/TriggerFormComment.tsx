import { Link, useForm } from "@inertiajs/react";
import { login } from "../../../actions/App/Http/Controllers/AuthController";
import { register } from "../../../actions/App/Http/Controllers/AuthController";
import { store } from "../../../actions/App/Http/Controllers/TriggerCommentController";
import { useRef, useEffect } from "react";
import { LuBold, LuEyeOff, LuItalic } from "react-icons/lu";

type TriggerFormCommentProps = {
  isGuest: boolean;
  triggerContent: App.DTOs.TriggerContentData;
  slug: string;
};

const TriggerFormComment = ({
  isGuest,
  triggerContent,
  slug,
}: TriggerFormCommentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Tracks selection coordinates safely across re-renders
  const cursorSelectionRef = useRef<{ start: number; end: number } | null>(
    null,
  );

  const { data, setData, post, reset } = useForm({
    slug: slug,
    commentable_id: triggerContent.id,
    commentable_type: "trigger_content",
    body: "",
  });

  // Updates cursor position immediately after the DOM text changes
  useEffect(() => {
    if (cursorSelectionRef.current && textareaRef.current) {
      const { start, end } = cursorSelectionRef.current;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(start, end);
      cursorSelectionRef.current = null;
    }
  }, [data.body]);

  const insertMarkdown = (before: string, after = "") => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = data.body.slice(start, end);

    const next =
      data.body.slice(0, start) +
      before +
      selected +
      after +
      data.body.slice(end);

    const cursorPos =
      selected.length > 0
        ? end + before.length + after.length
        : start + before.length;

    cursorSelectionRef.current = { start: cursorPos, end: cursorPos };
    setData("body", next);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(store.url());
    reset();
  };

  return (
    <div className="border-border bg-surface my-3 rounded border p-3 shadow-xs">
      {isGuest ? (
        <div className="relative">
          <textarea
            disabled
            placeholder="Share your thoughts..."
            className="text-text placeholder:text-text/30 min-h-17.5 w-full cursor-not-allowed bg-transparent text-sm outline-hidden"
            rows={4}
          />
          <div className="bg-surface/80 absolute inset-0 flex flex-col items-center justify-center gap-2 rounded backdrop-blur-[2px]">
            <p className="text-text-muted text-xs font-medium">
              Join the discussion
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={register.url()}
                className="bg-primary text-primary-soft rounded px-4 py-1.5 text-xs font-semibold transition hover:opacity-90 active:scale-95"
              >
                Register
              </Link>
              <span className="text-text-muted text-xs">or</span>
              <Link
                href={login.url()}
                className="border-border text-text-muted hover:bg-surface-alt hover:text-text rounded border px-4 py-1.5 text-xs font-semibold transition active:scale-95"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            name="body"
            value={data.body}
            placeholder="Share your thoughts..."
            onChange={(e) => setData("body", e.target.value)}
            className="text-text placeholder:text-text/50 min-h-17.5 w-full bg-transparent text-sm outline-hidden"
            rows={4}
            required
          />
          <p className="mt-1 text-xs font-medium text-red-500"></p>
          <div className="border-border/60 mt-2 flex items-center justify-between border-t border-dashed pt-2">
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => insertMarkdown("**", "**")}
                className="border-border bg-background hover:bg-muted rounded-md border px-2 py-1 text-xs font-semibold transition"
              >
                <LuBold />
              </button>

              <button
                type="button"
                onClick={() => insertMarkdown("*", "*")}
                className="border-border bg-background hover:bg-muted rounded-md border px-2 py-1 text-xs italic transition"
              >
                <LuItalic />
              </button>

              <button
                type="button"
                onClick={() => insertMarkdown("||", "||")}
                className="border-border bg-background hover:bg-muted rounded-md border px-2 py-1 text-xs transition"
              >
                <LuEyeOff />
              </button>
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-soft rounded-lg px-4 py-1.5 text-xs font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
            >
              Post Comment
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TriggerFormComment;
