import { IComment, ICommentItem } from "../types/types";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
  backendComments,
}:IComment) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date().getTime() - new Date(comment.createdAt).getTime() > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const getReplies = (commentId:string) =>
  backendComments
    .filter((backendComment:ICommentItem) => backendComment.parentId === commentId)
    .sort(
      (a:ICommentItem, b:ICommentItem) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
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
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {/* {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )} */}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
               { 
                console.log("replying",comment.id);
                setActiveComment({ id: comment.id, type: "replying" });}
              }
            >
              Reply
            </div>
          )}
          {/* {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )} */}
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
              console.log("parentID", activeComment.id);
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
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={getReplies(reply.id)}
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
