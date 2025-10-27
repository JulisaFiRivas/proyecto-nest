import { IsEnum, IsInt } from 'class-validator';
import { BookStatus } from '../../entities/user-book-list.entity/user-book-list.entity';

export class CreateUserBookListDto {
      @IsInt()
  userId: number;       // usuario que añade el libro
  @IsInt()
  bookId: number;

  @IsEnum(BookStatus)
  status: BookStatus;
}
