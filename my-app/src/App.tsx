
import { useState } from "react";
import AddComment from "./components/molecules/AddComment";
import Comment from "./components/organisams/Comment";
import IComment from "./types/types";
const commentData :IComment[] =  [
    {
      id: 1,
      text: "Example comment here.",
      children: [
        {
          id: 2,
          text: "Another example comment text.",
          children: [
            {
              id: 3,
              text: "Another example comment text.",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      text: "Example comment here 2.",
      children: []
    }
  ];

export default function App() {
  const [allCommentData, setAllCommentData] = useState<IComment[]>(commentData);
  const [commentInput, setCommentInput] = useState<string>("");
  const saveComment = (commentTxt:any,parentCommentId:number) => {
    console.log(commentTxt,parentCommentId);
  }
  return (
    <div className="App">
      <div>
        {allCommentData.map((comment:IComment) => {
          return <Comment comment={comment} key={comment.id} saveComment={saveComment}/>;
        })}
        {allCommentData.length===0?<AddComment saveComment={saveComment}/>:null}
       
      </div>
    </div>
  );
}
