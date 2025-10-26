export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // En producción, esto debería estar hasheado
  profilePicture?: string;
  role: UserRole;
}
