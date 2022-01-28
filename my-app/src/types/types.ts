export interface IComments {
    commentsUrl: string;
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
export interface IActiveComment { id: string, type: string }
export interface IComment {
    comment: ICommentItem;
    replies: ICommentItem[];
    setActiveComment: (comment: any) => void;
    activeComment: IActiveComment | null;
    updateComment: (text: string, id: string) => void;
    deleteComment: (commentId: string) => void;
    addComment: (text: string, id: string) => void;
    parentId: any;
    currentUserId: string;
    backendComments: any;
}