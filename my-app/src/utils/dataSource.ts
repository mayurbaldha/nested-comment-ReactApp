import { ICommentItem } from "../types/types";

export const getComments = async (): Promise<ICommentItem[]> => {
  return [ ];
};

export const createComment = async (text:string, parentId: string| null = null): Promise<ICommentItem>  => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",// default userId
    username: "Mayur", //default username
    createdAt: new Date().toISOString(),
  };
};