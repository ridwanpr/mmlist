import type React from "react";
import DashContainer from "../UserDash/Partials/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";
import { Link } from "@inertiajs/react";
import QuoteBlock from "../../Components/QuoteBlock";
import TimeAgo from "../../Components/TimeAgo";

type CommentHistoryProps = {
  paginatedComments: App.DTOs.PaginatedCommentData;
};

const CommentHistory = ({ paginatedComments }: CommentHistoryProps) => {
  console.log(paginatedComments);
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
                    className="text-primary text-sm hover:underline line-clamp-2"
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
              </div>
            ))}
        </div>
      </div>
    </DashContainer>
  );
};

CommentHistory.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default CommentHistory;
