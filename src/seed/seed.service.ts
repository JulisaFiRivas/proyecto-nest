import { Injectable } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { ratingsData } from './data/rating.seed';
import { COMMENTS_SEED } from './data/comment.seed';
import { LISTS_SEED } from './data/list.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  /**
   * Devuelve los datos de seed para inspección/manual insert.
   * NOTA: No realiza inserciones a BD para evitar dependencias de TypeORM
   * si no está configurado. Si quieres que inserte en DB, lo podemos
   * implementar usando los servicios/repositories adecuados.
   */
  populateDB() {
    const books = this.booksService.findAll();

    return {
      message: 'Seeds listos (no insertados).',
      books,
      ratings: ratingsData,
      comments: COMMENTS_SEED,
      lists: LISTS_SEED,
    };
  }
}
