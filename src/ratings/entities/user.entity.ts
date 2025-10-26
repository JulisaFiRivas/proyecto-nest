// src/users/entities/user.entity.ts
import { Rating } from '../../ratings/entities/rating.entity'; // <-- Tu entidad
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Esto es un "dummy" temporal
@Entity('User') // Asegúrate que el nombre de la tabla ('User') coincida
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // Esto es lo MÁS importante: la relación inversa que tu
  // entidad 'Rating' necesita para funcionar.
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  // NO necesitas añadir username, password, email, etc.
  // Esas son responsabilidades de tu compañera.
  // Solo necesitas lo que TU módulo consume.
}