import { LuHeart, LuPencil, LuReply, LuTrash2 } from 'react-icons/lu';
import QuoteBlock from '../../../Components/QuoteBlock';

type TriggerCommentItemProps = {
  comment: App.DTOs.CommentData;
  handleUpvote: (id: number) => void;
  auth: {
    user: {
      id: number;
      name: string;
      username: string;
      role_id: string;
      votes_count: number;
      joined_at: string;
      birth_date: string | null;
      show_nsfw: boolean;
    } | null;
  };
  openReplyModal: (commentId: number, commentBody: string, user: string) => void;
  handleEditComment: (commentId: number, body: string) => void;
  handleDeleteComment: (commentId: number) => void;
};

const TriggerCommentItem = ({
  comment,
  handleUpvote,
  auth,
  openReplyModal,
  handleEditComment,
  handleDeleteComment,
}: TriggerCommentItemProps) => {
  return (
    <>
      <div key={comment.id} className="border-border bg-surface mt-3 divide-y rounded-lg border">
        <div className="flex gap-4 px-4 py-3">
          <div className="flex shrink-0 flex-col items-center pt-0.5">
            <button
              onClick={() => handleUpvote(comment.id)}
              className={`-m-2 flex flex-col items-center gap-1 rounded-xl p-2 transition-colors hover:cursor-pointer ${
                comment.isUpvoted
                  ? 'text-accent-red hover:text-accent-red/80'
                  : 'text-text-muted hover:text-accent-red'
              }`}
            >
              <LuHeart className={`size-4 ${comment.isUpvoted ? 'fill-current' : ''}`} />
              <span className="text-xs leading-none">{comment.upvotes}</span>
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-sm font-semibold">{comment.user?.name ?? ''}</span>
            </div>

            {comment.parent && (
              <QuoteBlock
                authorName={comment.parent.user?.name ?? ''}
                body={comment.parent.bodyHtml}
              />
            )}

            <div
              className="prose prose-sm text-text mt-1 mb-2 max-w-none text-xs whitespace-pre-wrap md:text-sm"
              onClick={e => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('spoiler')) {
                  target.classList.add('revealed');
                }
              }}
              dangerouslySetInnerHTML={{
                __html: comment.bodyHtml.trim(),
              }}
            />

            {/* Action buttons row */}
            {auth.user && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    openReplyModal(comment.id, comment.bodyHtml, comment.user?.name ?? '')
                  }
                  className="text-text-muted hover:text-text flex items-center gap-1 text-xs hover:cursor-pointer"
                >
                  <LuReply className="size-3" />
                  Reply
                </button>

                {auth.user.id === comment.userId && (
                  <>
                    <button
                      onClick={() => handleEditComment(comment.id, comment.body)}
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
    </>
  );
};

export default TriggerCommentItem;
