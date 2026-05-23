import { Form, Link } from "@inertiajs/react";
import { login } from "../../../actions/App/Http/Controllers/AuthController";
import { register } from "../../../actions/App/Http/Controllers/AuthController";
import { store } from "../../../actions/App/Http/Controllers/CommentController";

type FormCommentProps = {
  isGuest: boolean;
  anime: App.DTOs.AnimeData;
};

const FormComment = ({ isGuest, anime }: FormCommentProps) => {
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
        <Form
          action={store.url()}
          method="post"
          disableWhileProcessing
          resetOnSuccess
        >
          <input type="hidden" name="slug" value={anime.slug} />
          <textarea
            name="body"
            placeholder="Share your thoughts..."
            className="text-text placeholder:text-text/50 min-h-17.5 w-full bg-transparent text-sm outline-hidden"
            rows={4}
            required
          />
          <p className="mt-1 text-xs font-medium text-red-500"></p>
          <div className="border-border/60 mt-2 flex justify-end border-t border-dashed pt-2">
            <button
              type="submit"
              className="bg-primary text-primary-soft rounded-lg px-4 py-1.5 text-xs font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
            >
              Post Comment
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default FormComment;
