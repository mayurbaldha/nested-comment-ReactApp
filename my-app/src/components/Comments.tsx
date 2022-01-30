import { useEffect, useState } from "react";
import { IActiveComment, ICommentItem, IComments } from "../types/types";
import {
  createComment as createCommentApi, getComments as getCommentsApi
} from "../utils/dataSource";
import { getReplies } from "../utils/util";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
const Comments = ({ currentUserId }:IComments) => {
  const [backendComments, setBackendComments] = useState<ICommentItem[]>([]);
  const [activeComment, setActiveComment] = useState<IActiveComment | null>(null);
  const addComment = (text:string, parentId:string| null) => {
    createCommentApi(text, parentId).then((comment:ICommentItem) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  useEffect(() => {
    getCommentsApi().then((data:ICommentItem[]) => {
      setBackendComments(data);
    });
    return ()=>{
      setBackendComments([]);
    }
  }, []);
  const nestedComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  ).map((rootComment) => {
    return <Comment
      key={rootComment.id}
      comment={rootComment}
      replies={getReplies(rootComment.id,backendComments)}
      activeComment={activeComment}
      setActiveComment={setActiveComment}
      addComment={addComment}
      currentUserId={currentUserId}
      backendComments={backendComments} parentId={null}  />;
  });

 
  return (
    <div className="comments">
      <h5 className="comments-title">Comments App</h5>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Add New Comment" 
      handleSubmit={(text)=>{addComment(text, null)}}
      initialText={""} 
      hasCancelButton={false} 
      handleCancel={function (): void {
        throw new Error("Function not implemented.");
      } } />
      <div className="comments-container">
        {nestedComments}
      </div>
    </div>
  );
};

export default Comments;
