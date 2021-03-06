export interface IComments {
    currentUserId: string;
}
export interface ICommentItem {
    id: string,
    body: string,
    username: string,
    userId: string,
    parentId: string | null,
    createdAt: string,
}
export interface IActiveComment { id: string }
export interface IComment {
    comment: ICommentItem;
    replies: ICommentItem[];
    setActiveComment: (commentId: IActiveComment) => void;
    activeComment: IActiveComment | null;
    addComment: (text: string, id: string) => void;
    parentId: string | null;
    currentUserId: string;
    backendComments: ICommentItem[];
}
export interface ICommentForm{
    initialText: string;
    hasCancelButton: boolean;
    handleSubmit: (text: string,parentId?:string) => void;
    handleCancel: () => void;
    submitLabel: string;
  }