import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

export enum BookStatus {
  LEIDO = 'LEIDO',
  DESEO_LEER = 'DESEO_LEER',
  LEYENDO = 'LEYENDO',  // Agregué este estado que falta
}

@Entity('userbooklist')
export class UserBookList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'book_id' })
  book_id: number;

  @ManyToOne(() => User, (user) => user.bookLists, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, (book) => book.userLists, { eager: true })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({
    type: 'enum',
    enum: BookStatus,
  })
  status: BookStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_date: Date;
}