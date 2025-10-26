import { Book } from 'src/books/entities/book.entity';
import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('Rating') // Le decimos que esta clase mapea la tabla 'Rating'
@Unique('uk_user_book_rating', ['user', 'book']) // Tu restricción UNIQUE
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  score: number;

  // --- Columnas para las Llaves Foráneas ---
  @Column()
  user_id: number;

  @Column()
  book_id: number;

  // --- Relaciones de TypeORM ---
  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // Columna que gestiona la relación
  user: User;

  @ManyToOne(() => Book, (book) => book.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' }) // Columna que gestiona la relación
  book: Book;
}

// NOTA: Debes ir a 'user.entity.ts' y 'book.entity.ts' y añadir
// la relación inversa para que TypeORM funcione correctamente:
//
// En user.entity.ts:
// @OneToMany(() => Rating, (rating) => rating.user)
// ratings: Rating[];
//
// En book.entity.ts:
// @OneToMany(() => Rating, (rating) => rating.book)
// ratings: Rating[];