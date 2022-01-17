export default interface IComment {
    id: number;
    text: string;
    children: IComment[];
}