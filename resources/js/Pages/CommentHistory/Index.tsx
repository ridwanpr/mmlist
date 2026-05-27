import type React from "react";
import DashContainer from "../UserDash/Partials/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";

const CommentHistory = () => {
  return (
    <DashContainer>
      <div className="mb-6 p-4 lg:p-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Comments
          </h1>
          <p className="text-text-muted text-xs">Review the history of your comments</p>
        </div>
        <div>
            
        </div>
      </div>
    </DashContainer>
  );
};

CommentHistory.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default CommentHistory;
