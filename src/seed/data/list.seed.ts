// Seed para listas de usuario-libro
import { BookStatus } from 'src/lists/entities/user-book-list.entity/user-book-list.entity';

export const LISTS_SEED = [
  {
    id: 1,
    user_id: 1,
    book_id: 1,
    status: BookStatus.LEIDO,
  },
  {
    id: 2,
    user_id: 1,
    book_id: 2,
    status: BookStatus.DESEO_LEER,
  },
  {
    id: 3,
    user_id: 1,
    book_id: 4,
    status: BookStatus.DESEO_LEER,
  },
  {
    id: 4,
    user_id: 2,
    book_id: 1,
    status: BookStatus.LEIDO,
  },
  {
    id: 5,
    user_id: 2,
    book_id: 2,
    status: BookStatus.LEIDO,
  },
  {
    id: 6,
    user_id: 3,
    book_id: 4,
    status: BookStatus.LEIDO,
  },
];
