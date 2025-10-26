export class CreateCommentDto {
  content: string;
  user_id: number;
  book_id: number;
  parent_comment_id?: number;
}
