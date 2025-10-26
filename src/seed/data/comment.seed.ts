// src/seed/data/comment.seed.ts
// Seed de comentarios de ejemplo. Asegúrate de que los user_id y book_id
// referenciados existan en los seeds de usuarios y libros.

export const COMMENTS_SEED = [
  {
    id: 1,
    content: 'Maravilloso libro, lo recomiendo mucho.',
    user_id: 1,
    book_id: 1,
    parent_comment_id: null,
  },
  {
    id: 2,
    content: 'No estuve de acuerdo con el final, aunque la prosa es excelente.',
    user_id: 2,
    book_id: 1,
    parent_comment_id: null,
  },
  {
    id: 3,
    content: 'Respuesta al comentario: entiendo tu punto, pero creo que... ',
    user_id: 3,
    book_id: 1,
    parent_comment_id: 2,
  },
  {
    id: 4,
    content: 'Un clásico que siempre vale la pena releer.',
    user_id: 1,
    book_id: 2,
    parent_comment_id: null,
  },
  {
    id: 5,
    content: 'Me gustó mucho la construcción de personajes.',
    user_id: 2,
    book_id: 3,
    parent_comment_id: null,
  },
];
