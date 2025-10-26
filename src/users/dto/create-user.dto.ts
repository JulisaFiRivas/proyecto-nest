export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
  role?: 'USER' | 'ADMIN';
}
