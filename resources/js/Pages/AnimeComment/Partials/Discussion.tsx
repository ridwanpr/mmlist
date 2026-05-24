import { useEffect, useRef, useState } from "react";
import { Form, Link, router, usePage } from "@inertiajs/react";
import { LuHeart, LuReply } from "react-icons/lu";
import { store } from "../../../actions/App/Http/Controllers/CommentController";
import { getAnimeComment } from "../../../actions/App/Http/Controllers/CommentController";

import QuoteBlock from "./QuoteBlock";
import FormComment from "./FormComment";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";
import { upvote } from "../../../actions/App/Http/Controllers/CommentController";
import Sorting from "./Sorting";
import ReplyFormModal from "./ReplyFormModal";

type DiscussionProps = {
  anime: App.DTOs.AnimeData;
  paginatedComment: App.DTOs.PaginatedCommentData;
  sortBy: "latest" | "most-loved" | "oldest";
};

export type RepliedComment = {
  parent_comment_id: number | null;
  parent_comment_body: string;
  parent_comment_user: string;
};

const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString.replace(" ", "T"));
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (Number.isNaN(diffInSeconds) || diffInSeconds < 0) {
    return "just now";
  }

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);

    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

const Discussion = ({ anime, paginatedComment, sortBy }: DiscussionProps) => {
  const { auth } = usePage().props;
  const isGuest = !auth.user;

  const [replyModal, setReplyModal] = useState(false);

  const [repliedComment, setRepliedComment] = useState<RepliedComment>({
    parent_comment_id: null,
    parent_comment_body: "",
    parent_comment_user: "",
  });

  const [comments, setComments] = useState(paginatedComment.data);

  const isUpvoting = useRef(false);

  useEffect(() => {
    if (!isUpvoting.current) {
      setComments(paginatedComment.data);
    }
  }, [paginatedComment.data]);

  const handleFilter = (filter: string) => {
    router.get(
      getAnimeComment.url(anime.slug),
      { sort: filter },
      { preserveScroll: true },
    );
  };

  const handleUpvote = (commentId: number) => {
    if (isGuest) return;

    const previousComments = comments;

    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              upvotes: c.isUpvoted ? c.upvotes - 1 : c.upvotes + 1,
              isUpvoted: !c.isUpvoted,
            }
          : c,
      ),
    );

    isUpvoting.current = true;

    router.put(
      upvote.url({ commentId }),
      {},
      {
        preserveScroll: true,
        preserveState: true,

        onSuccess: (page) => {
          const serverComments = (
            page.props as unknown as {
              paginatedComment: App.DTOs.PaginatedCommentData;
            }
          ).paginatedComment.data;

          setComments((prev) =>
            prev.map((local) => {
              const fromServer = serverComments.find((s) => s.id === local.id);

              return fromServer ?? local;
            }),
          );
        },

        onError: () => {
          setComments(previousComments);
        },

        onFinish: () => {
          isUpvoting.current = false;
        },
      },
    );
  };

  const openReplyModal = (
    commentId: number,
    commentBody: string,
    user: string,
  ) => {
    setRepliedComment({
      parent_comment_id: commentId,
      parent_comment_body: commentBody,
      parent_comment_user: user,
    });

    setReplyModal(true);
  };

  const closeReplyModal = () => {
    setReplyModal(false);

    setRepliedComment({
      parent_comment_id: null,
      parent_comment_body: "",
      parent_comment_user: "",
    });
  };

  return (
    <>
      <section id="discussion">
        <Link
          href={show.url(anime.slug)}
          className="text-primary text-lg font-semibold"
        >
          {anime.title_english || anime.title} - Discussion
        </Link>

        <FormComment isGuest={isGuest} anime={anime} />

        <Sorting sortBy={sortBy} handleFilter={handleFilter} />

        {comments?.map((comment, index) => (
          <div
            key={comment.id}
            className="border-border bg-surface mt-3 divide-y rounded border"
          >
            <div className="flex gap-4 px-4 py-3">
              <div className="flex shrink-0 flex-col items-center pt-0.5">
                <button
                  onClick={() => handleUpvote(comment.id)}
                  className={`-m-2 flex flex-col items-center gap-1 rounded-md p-2 transition-colors hover:cursor-pointer ${
                    comment.isUpvoted
                      ? "text-accent-red hover:text-accent-red/80"
                      : "text-text-muted hover:text-accent-red"
                  }`}
                >
                  <LuHeart
                    className={`size-4 ${
                      comment.isUpvoted ? "fill-current" : ""
                    }`}
                  />

                  <span className="text-xs leading-none">
                    {comment.upvotes}
                  </span>
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-primary text-sm font-semibold">
                    {comment.user?.name}
                  </span>

                  <span
                    className="text-text-muted text-xs"
                    suppressHydrationWarning
                  >
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>

                {index === 1 && (
                  <QuoteBlock
                    authorName="John Doe"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. The animation in episode 3 was genuinely peak."
                  />
                )}

                <div
                  className="prose prose-sm text-text mt-1 max-w-none text-xs whitespace-pre-wrap md:text-sm"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;

                    if (target.classList.contains("spoiler")) {
                      target.classList.add("revealed");
                    }
                  }}
                  dangerouslySetInnerHTML={{
                    __html: comment.bodyHtml,
                  }}
                />

                <button
                  onClick={() =>
                    openReplyModal(
                      comment.id,
                      comment.body,
                      comment.user?.name!,
                    )
                  }
                  className="text-text-muted hover:text-text flex items-center gap-1 text-xs hover:cursor-pointer"
                >
                  <LuReply className="size-3" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <ReplyFormModal
        replyModal={replyModal}
        closeReplyModal={closeReplyModal}
        repliedComment={repliedComment}
        slug={anime.slug}
      />
    </>
  );
};

export default Discussion;
