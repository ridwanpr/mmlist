import { useEffect, useRef, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { LuHeart, LuReply, LuPencil, LuTrash2 } from "react-icons/lu";
import {
  getAnimeComment,
  upvote,
} from "../../../actions/App/Http/Controllers/CommentController";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";

import QuoteBlock from "./QuoteBlock";
import FormComment from "./FormComment";
import Sorting from "./Sorting";
import ReplyFormModal from "./ReplyFormModal";
import TimeAgo from "../../../Components/TimeAgo";

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

  // Placeholder handlers for Edit and Delete actions
  const handleEditComment = (commentId: number) => {
    console.log("Edit comment clicked for ID:", commentId);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log("Delete comment clicked for ID:", commentId);
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

        {comments?.map((comment) => (
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
                    {comment.user?.name ?? ""}
                  </span>

                  <span className="text-text-muted text-xs">
                    <TimeAgo dateString={comment.createdAt} />
                  </span>
                </div>

                {comment.parent && (
                  <QuoteBlock
                    authorName={comment.parent.user?.name ?? ""}
                    body={comment.parent.body}
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

                {/* Action buttons row */}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() =>
                      openReplyModal(
                        comment.id,
                        comment.body,
                        comment.user?.name ?? "",
                      )
                    }
                    className="text-text-muted hover:text-text flex items-center gap-1 text-xs hover:cursor-pointer"
                  >
                    <LuReply className="size-3" />
                    Reply
                  </button>

                  {auth.user?.id === comment.userId && (
                    <>
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="text-text-muted hover:text-text flex items-center gap-1 text-xs hover:cursor-pointer"
                      >
                        <LuPencil className="size-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-text-muted hover:text-accent-red flex items-center gap-1 text-xs hover:cursor-pointer"
                      >
                        <LuTrash2 className="size-3" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {replyModal && (
        <ReplyFormModal
          replyModal={replyModal}
          closeReplyModal={closeReplyModal}
          repliedComment={repliedComment}
          slug={anime.slug}
        />
      )}
    </>
  );
};

export default Discussion;
