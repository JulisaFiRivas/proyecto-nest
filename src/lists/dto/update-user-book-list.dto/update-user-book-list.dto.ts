import { IsEnum } from 'class-validator';
import { BookStatus } from '../../entities/user-book-list.entity/user-book-list.entity';

export class UpdateUserBookListDto {
  @IsEnum(BookStatus)
  status: BookStatus;
}
