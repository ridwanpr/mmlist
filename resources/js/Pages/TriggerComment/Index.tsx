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
import type { RepliedComment } from "../AnimeComment/Partials/Discussion";
import TriggerReplyModal from "./Partials/TriggerReplyModal";

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
              />
            ))}
          </div>
        </div>
        <TriggerReplyModal
          repliedComment={repliedComment}
          replyModal={replyModal}
          closeReplyModal={closeReplyModal}
          triggerContentId={triggerContent.id}
        />
      </div>
    </div>
  );
};

TriggerComment.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default TriggerComment;
