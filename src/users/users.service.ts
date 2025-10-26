// src/users/users.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './entities/user.entity';
import { UserOrmEntity, UserRole } from './entities/user.orm-entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly usersRepo: Repository<UserOrmEntity>,
  ) {}

  /**
   * Obtener todos los usuarios
   */
  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();
    return users.map((u) => this.sanitizeUser(u));
  }

  /**
   * Obtener un usuario por ID
   */
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return this.sanitizeUser(user);
  }

  /** Buscar usuario por email (útil para login) */
  private async findByEmail(email: string): Promise<UserOrmEntity | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  /** Buscar usuario por username */
  private async findByUsername(username: string): Promise<UserOrmEntity | null> {
    return this.usersRepo.findOne({ where: { username } });
  }

  /**
   * Crear un nuevo usuario
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validar email
    if (!this.isValidEmail(createUserDto.email)) {
      throw new BadRequestException('El formato del email no es válido');
    }

    // Unicidad
    if (await this.findByEmail(createUserDto.email)) {
      throw new ConflictException(
        `El email ${createUserDto.email} ya está registrado`,
      );
    }
    if (await this.findByUsername(createUserDto.username)) {
      throw new ConflictException(
        `El username ${createUserDto.username} ya está en uso`,
      );
    }

    const toSave = this.usersRepo.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password, // En producción: hashear con bcrypt
      profilePicture: createUserDto.profilePicture ?? null,
      role: createUserDto.role || UserRole.USER,
    });

    const saved = await this.usersRepo.save(toSave);
    return this.sanitizeUser(saved);
  }

  /**
   * Actualizar un usuario existente
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    // Si se cambia email, validar formato y unicidad
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      if (!this.isValidEmail(updateUserDto.email)) {
        throw new BadRequestException('El formato del email no es válido');
      }
      const existing = await this.findByEmail(updateUserDto.email);
      if (existing) {
        throw new ConflictException(
          `El email ${updateUserDto.email} ya está registrado`,
        );
      }
    }

    // Si se cambia username, validar unicidad
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existing = await this.findByUsername(updateUserDto.username);
      if (existing) {
        throw new ConflictException(
          `El username ${updateUserDto.username} ya está en uso`,
        );
      }
    }

    const merged = this.usersRepo.merge(user, updateUserDto);
    const saved = await this.usersRepo.save(merged);
    return this.sanitizeUser(saved);
  }

  /**
   * Eliminar un usuario
   */
  async remove(id: number): Promise<void> {
    const res = await this.usersRepo.delete(id);
    if (!res.affected) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
  }

  /**
   * Remover la contraseña del objeto usuario por seguridad
   */
  private sanitizeUser(user: UserOrmEntity): User {
    // Retorna el mismo shape que la interfaz User, pero sin password
    const { password, ...rest } = user as any;
    return rest as User;
  }

  /**
   * Validación básica de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
