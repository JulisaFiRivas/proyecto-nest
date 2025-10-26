// /src/seed/data/ratings.data.ts

// Asegúrate de que los user_id y book_id existan
// en tus seeds de usuarios y libros.

export const ratingsData = [
  {
    score: 5,
    user_id: 1, // ID de un usuario existente
    book_id: 1, // ID de un libro existente
  },
  {
    score: 4,
    user_id: 2, // ID de otro usuario
    book_id: 1, // Mismo libro, diferente usuario
  },
  {
    score: 3,
    user_id: 1, // Mismo usuario que el primero
    book_id: 2, // Puntuando un libro diferente
  },
  {
    score: 1,
    user_id: 3,
    book_id: 3,
  },
];