import { Injectable } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  populateDB() {
    return 'semilla ejecutada';
  }
}
