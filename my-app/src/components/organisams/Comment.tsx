import { useState } from "react";
import IComment from "../../types/types";
import { generateGuid } from "../../utility/utils";
import AddComment from "../molecules/AddComment";

function Comment(props:any) {
   const {comment}=props;
    const saveComment = (commentTxt:string,parentCommentId:number) => {
        console.log(commentTxt,parentCommentId);
        console.log([...comment.children,{id:generateGuid(),text:commentTxt,children:[]}]);
        props.saveComment([...comment.children,{id:generateGuid(),text:commentTxt,children:[]}],parentCommentId);
        //isReplyComment=false, parentComment=null, commentText=null
    }
    const nestedComments = (comment.children || []).map((comment:IComment) => {
      return <Comment key={comment.id} comment={comment} saveComment={saveComment}/>;
    });
    const [commentInput, setCommentInput] = useState<string>("");
    return (
      <div style={{ marginLeft: "25px", marginTop: "10px" }}>
        <div>{comment.text}</div>
        {nestedComments}
        <AddComment saveComment={saveComment} parentCommentId={comment.id}/>
      </div>
    );
  }
  export default Comment;