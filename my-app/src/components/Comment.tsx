import { IComment } from "../types/types";
import { getReplies } from "../utils/util";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  addComment,
  parentId = null,
  currentUserId,
  backendComments,
}:IComment) => {
  const isReplying =
    activeComment &&
    activeComment.id === comment.id ;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="./logo192.png" width={40} alt="userProfileImage"/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div className="comment-date">{createdAt}</div>
        </div>
        {<div className="comment-text">{comment.body}</div>}
        <div className="comment-actions">
          {Boolean(currentUserId) && (
            <div
              className="comment-action"
              onClick={() =>
               {
                setActiveComment({ id: comment.id });}
              }
            >
              Reply
            </div>
          )}
          <div className="comment-action">
            Share
          </div>
          <div className="comment-action">
            Report
          </div>
          <div className="comment-action">
            Save
          </div>
        </div>
        
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => {
              addComment(text, activeComment.id);
            }} 
            initialText={""} 
            hasCancelButton={false} 
            handleCancel={function (): void {
              throw new Error("Function not implemented.");
            } }          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
                parentId={comment.id}
                replies={getReplies(reply.id,backendComments)}
                currentUserId={currentUserId}
                backendComments={backendComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
