import { useState } from "react";



 const AddComment = (props:any) => {
    const [commentInput, setCommentInput] = useState<string>("");
    return(
        <>
        <input
        value={commentInput} onChange={e => setCommentInput(e.target.value)} type={'text'}/>
        <button onClick={()=>props.saveComment(commentInput)}>Save</button>
        </>
    )

}
export default AddComment;