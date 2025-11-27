export class CreateCommentDto {
  content: string;
  book_id: number;
  parent_comment_id?: number;
}
