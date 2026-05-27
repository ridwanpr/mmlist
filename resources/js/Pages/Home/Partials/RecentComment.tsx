type RecentCommentProps = {
  latestComments: App.DTOs.CommentData[];
};

const RecentComment = ({ latestComments }: RecentCommentProps) => {
  return (
    <div>
      <div className="mx-auto max-w-7xl p-4">
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">
          Recent Comments
        </h2>
        <div className="bg-surface border-border divide-border mt-4 divide-y overflow-hidden rounded-xl border shadow-xs">
          {/* Comment Row */}
          {latestComments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-1.5 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-primary cursor-pointer font-serif text-base font-bold transition-colors hover:underline">
                  {comment.commentable
                    ? "title" in comment.commentable
                      ? comment.commentable.title
                      : comment.commentable.name
                    : ""}
                </span>
                <span className="text-text-muted text-xs">5 mins ago</span>
              </div>
              <div className="text-text-muted text-xs">
                By <span className="text-text font-medium">AsukaFan95</span>
              </div>
              <p className="text-text mt-1 text-sm leading-relaxed">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentComment;
