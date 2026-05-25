import { useEffect, useRef, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { LuHeart, LuReply, LuPencil, LuTrash2 } from "react-icons/lu";
import {
  destroy,
  getAnimeComment,
  upvote,
} from "../../../actions/App/Http/Controllers/CommentController";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";

import QuoteBlock from "./QuoteBlock";
import FormComment from "./FormComment";
import Sorting from "./Sorting";
import ReplyFormModal from "./ReplyFormModal";
import TimeAgo from "../../../Components/TimeAgo";
import EditFormModal from "./EditFormModal";

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

export type EditedComment = {
  comment_id: number | null;
  body: string;
};

const Discussion = ({ anime, paginatedComment, sortBy }: DiscussionProps) => {
  const { auth } = usePage().props;
  const isGuest = !auth.user;

  const [replyModal, setReplyModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [repliedComment, setRepliedComment] = useState<RepliedComment>({
    parent_comment_id: null,
    parent_comment_body: "",
    parent_comment_user: "",
  });

  const [editComment, setEditComment] = useState<EditedComment>({
    comment_id: null,
    body: "",
  });

  console.log(editComment);

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

  const closeEditModal = () => {
    setEditModal(false);
    setEditComment({
      comment_id: null,
      body: "",
    });
  };

  const handleEditComment = (commentId: number, body: string) => {
    console.log(commentId);
    setEditModal(true);
    setEditComment({
      comment_id: commentId,
      body: body,
    });
  };

  const handleDeleteComment = (commentId: number) => {
    if (confirm("Are you sure want to delete this comment?")) {
      router.delete(destroy.url({ commentId: commentId }), {
        preserveScroll: true,
      });
    }
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
                  className="prose prose-sm text-text mt-1 mb-0 max-w-none text-xs whitespace-pre-wrap md:text-sm"
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
                {auth.user && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        openReplyModal(
                          comment.id,
                          comment.bodyHtml,
                          comment.user?.name ?? "",
                        )
                      }
                      className="text-text-muted hover:text-text flex items-center gap-1 text-xs hover:cursor-pointer"
                    >
                      <LuReply className="size-3" />
                      Reply
                    </button>

                    {auth.user.id === comment.userId && (
                      <>
                        <button
                          onClick={() =>
                            handleEditComment(comment.id, comment.body)
                          }
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
                )}
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

      {editModal && (
        <EditFormModal
          editModal={editModal}
          closeEditModal={closeEditModal}
          editComment={editComment}
        />
      )}
    </>
  );
};

export default Discussion;
