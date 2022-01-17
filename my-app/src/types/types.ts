export default interface IComment {
    id: number;
    text: string;
    author: string;
    children: IComment[];
}