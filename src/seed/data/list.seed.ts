// Seed para listas de usuario-libro
// Asegúrate de que los user_id y book_id referenciados existan
// en los seeds de usuarios y libros.

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
    user_id: 2,
    book_id: 3,
    status: BookStatus.LEIDO,
  },
  {
    id: 4,
    user_id: 3,
    book_id: 5,
    status: BookStatus.DESEO_LEER,
  },
  {
    id: 5,
    user_id: 2,
    book_id: 7,
    status: BookStatus.LEIDO,
  },
  {
    id: 6,
    user_id: 3,
    book_id: 10,
    status: BookStatus.LEIDO,
  },
];
