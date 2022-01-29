import { ICommentItem } from "../types/types";

export  const getReplies = (commentId:string,backendComments:ICommentItem[]) =>
backendComments
  .filter((backendComment:ICommentItem) => backendComment.parentId === commentId)
  .sort(
    (a:ICommentItem, b:ICommentItem) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );