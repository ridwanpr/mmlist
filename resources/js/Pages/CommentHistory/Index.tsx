import type React from "react";
import DashContainer from "../UserDash/Partials/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";
import { Link, router, usePage } from "@inertiajs/react";
import QuoteBlock from "../../Components/QuoteBlock";
import TimeAgo from "../../Components/TimeAgo";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import EditModal from "./Partials/EditModal";
import { useState } from "react";
import type { EditedComment } from "../AnimeComment/Partials/Discussion";
import { destroy } from "../../routes/comment";

type CommentHistoryProps = {
  paginatedComments: App.DTOs.PaginatedCommentData;
};

const CommentHistory = ({ paginatedComments }: CommentHistoryProps) => {
  const { auth } = usePage().props;

  const [editModal, setEditModal] = useState(false);
  const [editComment, setEditComment] = useState<EditedComment>({
    comment_id: null,
    body: "",
  });

  const closeEditModal = () => {
    setEditModal(false);
    setEditComment({
      comment_id: null,
      body: "",
    });
  };

  const handleEditComment = (commentId: number, body: string) => {
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
    <DashContainer>
      <div className="mb-6 p-4 lg:p-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Comments
          </h1>
          <p className="text-text-muted text-xs">
            Review the history of your comments
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {paginatedComments.data &&
            paginatedComments.data.map((comment) => (
              <div
                key={comment.id}
                className="bg-surface border-border rounded-xl border p-4"
              >
                <div className="flex justify-between">
                  <Link
                    href="#"
                    className="text-primary line-clamp-2 text-sm hover:underline"
                  >
                    {comment.anime?.title_english || comment.anime?.title}
                  </Link>
                  <span className="text-text-muted text-xs">
                    <TimeAgo dateString={comment.createdAt} />
                  </span>
                </div>
                {comment.parent && (
                  <QuoteBlock
                    body={comment.parent.bodyHtml}
                    authorName={comment.parent.user!.name}
                  />
                )}
                <div
                  className="prose prose-sm text-text mt-1 mb-1 max-w-none text-xs whitespace-pre-wrap md:text-sm"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.classList.contains("spoiler")) {
                      target.classList.add("revealed");
                    }
                  }}
                  dangerouslySetInnerHTML={{
                    __html: comment.bodyHtml.trim(),
                  }}
                />

                {/* Action buttons row */}
                {auth.user && (
                  <div className="flex items-center gap-3 mt-2">
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
                  </div>
                )}
              </div>
            ))}
        </div>

        <EditModal
          closeEditModal={closeEditModal}
          editComment={editComment}
          editModal={editModal}
        />
      </div>
    </DashContainer>
  );
};

CommentHistory.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default CommentHistory;
