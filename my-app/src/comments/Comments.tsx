import { useEffect, useState } from "react";
import {
  createComment as createCommentApi, deleteComment as deleteCommentApi, getComments as getCommentsApi, updateComment as updateCommentApi
} from "../dataSource";
import { IActiveComment, ICommentItem, IComments } from "../types/types";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
const Comments = ({ commentsUrl, currentUserId }:IComments) => {
  const [backendComments, setBackendComments] = useState<ICommentItem[]>([]);
  const [activeComment, setActiveComment] = useState<IActiveComment | null>(null);
  const getReplies = (commentId:string) =>
    backendComments
      .filter((backendComment:ICommentItem) => backendComment.parentId === commentId)
      .sort(
        (a:ICommentItem, b:ICommentItem) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text:string, parentId:string| null) => {
    createCommentApi(text, parentId).then((comment:ICommentItem) => {
      console.log(comment);
      console.log([comment, ...backendComments]);
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text:string, commentId:string) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment:ICommentItem) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId:string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment:ICommentItem) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
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
      replies={getReplies(rootComment.id)}
      activeComment={activeComment}
      setActiveComment={setActiveComment}
      addComment={addComment}
      deleteComment={deleteComment}
      updateComment={updateComment}
      currentUserId={currentUserId}
      backendComments={backendComments} parentId={undefined}  />;
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
