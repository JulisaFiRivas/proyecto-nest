// src/seed/data/comment.seed.ts
export const COMMENTS_SEED = [
  {
    id: 1,
    content: 'Reemplazo completo',
    user_id: 1,
    book_id: 1,
    parent_comment_id: null,
  },
  {
    id: 3,
    content: 'Un libro que te cambia la perspectiva. Aterrador y brillante.',
    user_id: 3,
    book_id: 4,
    parent_comment_id: null,
  },
  {
    id: 4,
    content: 'Totalmente de acuerdo, Ana. La prosa de GGM es inigualable.',
    user_id: 2,
    book_id: 1,
    parent_comment_id: 1,
  },
  {
    id: 5,
    content: 'A mi hijo también le fascinó, Benito. Gran inicio de saga.',
    user_id: 1,
    book_id: 3,
    parent_comment_id: null,
  },
  {
    id: 6,
    content: 'Maravilloso libro, lo recomiendo.',
    user_id: 1,
    book_id: 1,
    parent_comment_id: null,
  },
];
