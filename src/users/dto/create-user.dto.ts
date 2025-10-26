import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  role?: UserRole;
}
