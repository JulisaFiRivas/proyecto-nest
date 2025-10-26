import { User, UserRole } from 'src/users/entities/user.entity';

export const USER_SEED: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@libroteca.com',
    password: 'admin123', // En producción usar bcrypt para hashear
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    role: UserRole.ADMIN,
  },
  {
    id: 2,
    username: 'juanperez',
    email: 'juan.perez@email.com',
    password: 'user123',
    profilePicture: 'https://i.pravatar.cc/150?img=2',
    role: UserRole.USER,
  },
  {
    id: 3,
    username: 'maria_garcia',
    email: 'maria.garcia@email.com',
    password: 'user123',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    role: UserRole.USER,
  },
  {
    id: 4,
    username: 'carlos_lopez',
    email: 'carlos.lopez@email.com',
    password: 'user123',
    profilePicture: 'https://i.pravatar.cc/150?img=4',
    role: UserRole.USER,
  },
  {
    id: 5,
    username: 'ana_martinez',
    email: 'ana.martinez@email.com',
    password: 'user123',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    role: UserRole.USER,
  },
  {
    id: 6,
    username: 'pedro_sanchez',
    email: 'pedro.sanchez@email.com',
    password: 'user123',
    profilePicture: 'https://i.pravatar.cc/150?img=6',
    role: UserRole.USER,
  },
  {
    id: 7,
    username: 'laura_rodriguez',
    email: 'laura.rodriguez@email.com',
    password: 'user123',
    profilePicture: 'https://i.pravatar.cc/150?img=7',
    role: UserRole.USER,
  },
  {
    id: 8,
    username: 'moderador',
    email: 'moderador@libroteca.com',
    password: 'mod123',
    profilePicture: 'https://i.pravatar.cc/150?img=8',
    role: UserRole.ADMIN,
  },
];
