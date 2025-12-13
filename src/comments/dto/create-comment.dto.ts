import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsNumber()
  book_id: number;

  @IsOptional()
  @IsNumber()
  parent_comment_id?: number;
}