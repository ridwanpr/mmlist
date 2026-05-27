import { router, usePage } from "@inertiajs/react";
import AnimeInfo from "../../Components/AnimeInfo";
import FrontLayout from "../../Layouts/FrontLayout";
import TriggerCommentbread from "./Partials/TriggerCommentBread";
import TriggerDiscussionTitle from "./Partials/TriggerDiscussionTitle";
import TriggerFormComment from "./Partials/TriggerFormComment";
import Sorting from "../../Components/Sorting";
import { getTriggerComment } from "../../actions/App/Http/Controllers/TriggerCommentController";
import TriggerStat from "./Partials/TriggerStat";
import TriggerCommentItem from "./Partials/TriggerCommentItem";
import { useState } from "react";
import type {
  EditedComment,
  RepliedComment,
} from "../AnimeComment/Partials/Discussion";
import TriggerReplyModal from "./Partials/TriggerReplyModal";
import EditFormModal from "../AnimeComment/Partials/EditFormModal";
import { destroy } from "../../actions/App/Http/Controllers/CommentController";

type TriggerCommentProps = {
  anime: App.DTOs.AnimeData;
  triggerContent: App.DTOs.TriggerContentData;
  triggerStatData: App.DTOs.AnimeTriggerStatData;
  sortBy: "latest" | "most-loved" | "oldest";
  triggerComments: App.DTOs.PaginatedCommentData;
};

const TriggerComment = ({
  anime,
  triggerContent,
  sortBy,
  triggerStatData,
  triggerComments,
}: TriggerCommentProps) => {
  const { auth } = usePage().props;
  const isGuest = !auth.user;

  const [replyModal, setReplyModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [editComment, setEditComment] = useState<EditedComment>({
    comment_id: null,
    body: "",
  });

  const [repliedComment, setRepliedComment] = useState<RepliedComment>({
    parent_comment_id: null,
    parent_comment_body: "",
    parent_comment_user: "",
  });

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

  const handleFilter = (filter: string) => {
    router.get(
      getTriggerComment.url({
        animeslug: anime.slug,
        triggerContentSlug: triggerContent.slug,
      }),
      { sort: filter },
      { preserveScroll: true },
    );
  };

  const handleEditComment = (commentId: number, body: string) => {
    setEditModal(true);
    setEditComment({
      comment_id: commentId,
      body: body,
    });
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditComment({
      comment_id: null,
      body: "",
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
    <div>
      <div className="mx-auto mb-8 max-w-7xl px-4 py-6">
        <TriggerCommentbread triggerContent={triggerContent} anime={anime} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
          <AnimeInfo anime={anime} />
          <div>
            <TriggerDiscussionTitle
              anime={anime}
              triggerContent={triggerContent}
            />
            <TriggerStat triggerStatData={triggerStatData} />
            <TriggerFormComment
              triggerContent={triggerContent}
              isGuest={isGuest}
            />
            <Sorting sortBy={sortBy} handleFilter={handleFilter} />
            {triggerComments.data?.map((comment) => (
              <TriggerCommentItem
                key={comment.id}
                auth={auth}
                comment={comment}
                handleUpvote={() => {}}
                openReplyModal={openReplyModal}
                handleDeleteComment={handleDeleteComment}
                handleEditComment={handleEditComment}
              />
            ))}
          </div>
        </div>
        {replyModal && (
          <TriggerReplyModal
            repliedComment={repliedComment}
            replyModal={replyModal}
            closeReplyModal={closeReplyModal}
            triggerContentId={triggerContent.id}
          />
        )}
        {editModal && (
          <EditFormModal
            editModal={editModal}
            closeEditModal={closeEditModal}
            editComment={editComment}
          />
        )}
      </div>
    </div>
  );
};

TriggerComment.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default TriggerComment;
