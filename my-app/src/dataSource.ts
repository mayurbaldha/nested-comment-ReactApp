import { ICommentItem } from "./types/types";

export const getComments = async (): Promise<ICommentItem[]> => {
  return [
    //sample Data
    // {
    //   id: "1",
    //   body: "First comment",
    //   username: "Sai",
    //   userId: "1",
    //   parentId: null,
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
    // {
    //   id: "2",
    //   body: "Second comment",
    //   username: "Mayur",
    //   userId: "2",
    //   parentId: null,
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
    // {
    //   id: "3",
    //   body: "First comment first child",
    //   username: "Mayur",
    //   userId: "2",
    //   parentId: "1",
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
    // {
    //   id: "4",
    //   body: "Second comment second child",
    //   username: "Mayur",
    //   userId: "2",
    //   parentId: "2",
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
    // {
    //   body: "fdsf",
    //   createdAt: "2022-01-27T08:50:09.649Z",
    //   id: "3wghc73o3",
    //   parentId: "3",
    //   userId: "2",
    //   username: "Mayur",
    // }
  ];
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

export const updateComment = async (text:string): Promise<any>  => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
