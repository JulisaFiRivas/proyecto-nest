import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    // Verificar si el username ya existe
    const existingUsername = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (existingUsername) {
      throw new ConflictException(`El username '${dto.username}' ya está en uso`);
    }

    // Verificar si el email ya existe
    const existingEmail = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingEmail) {
      throw new ConflictException(`El email '${dto.email}' ya está en uso`);
    }

    const user = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: dto.password, // En producción debería hashearse
      profile_picture: dto.profile_picture,
      role: dto.role ?? 'USER',
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`Usuario con username '${username}' no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Usuario con email '${email}' no encontrado`);
    }
    return user;
  }

  // Métodos internos que NO lanzan excepciones (para uso en AuthService)
  async findByEmailInternal(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByUsernameInternal(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async remove(id: number, requestingUserId: number, requestingUserRole: string) {
    // Solo el admin o el propietario pueden eliminar
    if (requestingUserRole !== 'ADMIN' && requestingUserId !== id) {
      throw new ForbiddenException('No tienes permiso para eliminar este usuario');
    }
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return { deleted: true };
  }

  async replace(id: number, dto: CreateUserDto, requestingUserId: number, requestingUserRole: string) {
    // Solo el admin o el propietario pueden reemplazar
    if (requestingUserRole !== 'ADMIN' && requestingUserId !== id) {
      throw new ForbiddenException('No tienes permiso para actualizar este usuario');
    }
    await this.findOne(id);

    // Verificar conflictos de username y email excluyendo el usuario actual
    const existingUsername = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (existingUsername && existingUsername.id !== id) {
      throw new ConflictException(`El username '${dto.username}' ya está en uso`);
    }

    const existingEmail = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingEmail && existingEmail.id !== id) {
      throw new ConflictException(`El email '${existingEmail}' ya está en uso`);
    }

    const toSave = {
      id,
      username: dto.username,
      email: dto.email,
      password: dto.password, // En producción debería hashearse
      profile_picture: dto.profile_picture,
      role: dto.role ?? 'USER',
    };

    return this.userRepository.save(toSave);
  }

  async update(id: number, dto: UpdateUserDto, requestingUserId: number, requestingUserRole: string) {
    // Solo el admin o el propietario pueden actualizar
    if (requestingUserRole !== 'ADMIN' && requestingUserId !== id) {
      throw new ForbiddenException('No tienes permiso para actualizar este usuario');
    }
    const user = await this.findOne(id);

    // Verificar conflictos de username si se está actualizando
    if (dto.username) {
      const existingUsername = await this.userRepository.findOne({
        where: { username: dto.username },
      });
      if (existingUsername && existingUsername.id !== id) {
        throw new ConflictException(`El username '${dto.username}' ya está en uso`);
      }
    }

    // Verificar conflictos de email si se está actualizando
    if (dto.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictException(`El email '${dto.email}' ya está en uso`);
      }
    }

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }
}
