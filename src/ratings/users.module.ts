// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra la entidad "dummy"
  ],
  // No necesitamos controllers ni providers, pero
  // DEBEMOS exportar el TypeOrmModule para que otros módulos lo vean.
  exports: [TypeOrmModule], 
})
export class UsersModule {}