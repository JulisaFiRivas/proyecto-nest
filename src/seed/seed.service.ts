import { Injectable } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class SeedService {
  constructor(private readonly booksService: BooksService) {}

  populateDB() {
    return 'semilla ejecutada';
  }
}
