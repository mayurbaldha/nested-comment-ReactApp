import { useState } from "react";
import IComment from "../../types/types";
import AddComment from "../molecules/AddComment";

function Comment( {comment} :any) {
    const saveComment = (commentTxt:string) => {
        console.log(commentTxt);
        //isReplyComment=false, parentComment=null, commentText=null
    }
    const nestedComments = (comment.children || []).map((comment:IComment) => {
      return <Comment key={comment.id} comment={comment} />;
    });
    const [commentInput, setCommentInput] = useState<string>("");
    return (
      <div style={{ marginLeft: "25px", marginTop: "10px" }}>
        <div>{comment.text}</div>
        {nestedComments}
        <AddComment saveComment={saveComment}/>
      </div>
    );
  }
  export default Comment;