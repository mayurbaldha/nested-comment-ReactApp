
import { useState } from "react";
import AddComment from "./components/molecules/AddComment";
import Comment from "./components/organisams/Comment";
import IComment from "./types/types";
const commentData :IComment[] =  [
    {
      id: 1,
      text: "Example comment here.",
      author: "user2",
      children: [
        {
          id: 2,
          text: "Another example comment text.",
          author: "user3",
          children: [
            {
              id: 3,
              text: "Another example comment text.",
              author: "user4",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      text: "Example comment here 2.",
      author: "user5",
      children: []
    }
  ];

export default function App() {
  const [allCommentData, setAllCommentData] = useState<IComment[]>(commentData);
  const [commentInput, setCommentInput] = useState<string>("");
  const saveComment = (commentTxt:string) => {
    console.log(commentTxt);
  }
  return (
    <div className="App">
      <div>
        {commentData.map((comment:IComment) => {
          return <Comment comment={comment} key={comment.id}/>;
        })}
        {commentData.length===0?<AddComment saveComment={saveComment}/>:null}
       
      </div>
    </div>
  );
}
