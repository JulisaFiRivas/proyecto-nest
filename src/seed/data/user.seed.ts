// src/seed/data/user.seed.ts
// Seed de usuarios con contraseñas que serán hasheadas

export const USERS_SEED = [
  {
    id: 1,
    username: 'ana_lectora',
    email: 'ana@email.com',
    password: 'password123', // Será hasheada
    profile_picture: 'https://cdn-icons-png.freepik.com/256/6076/6076390.png',
    role: 'USER' as const,
  },
  {
    id: 2,
    username: 'benito_books',
    email: 'benito@email.com',
    password: 'password123',
    profile_picture: 'https://cdn-icons-png.flaticon.com/256/6858/6858504.png',
    role: 'USER' as const,
  },
  {
    id: 3,
    username: 'carla_admin',
    email: 'carla@email.com',
    password: 'admin123',
    profile_picture: 'https://cdn-icons-png.freepik.com/256/6076/6076390.png',
    role: 'ADMIN' as const,
  },
];
