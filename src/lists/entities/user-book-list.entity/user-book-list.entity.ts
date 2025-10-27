import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

export enum BookStatus {
  LEIDO = 'LEIDO',
  DESEO_LEER = 'DESEO_LEER',
}

@Entity('userbooklist')
export class UserBookList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookLists, { eager: true })
  user: User;

  @ManyToOne(() => Book, (book) => book.userLists, { eager: true })
  book: Book;

  @Column({
    type: 'enum',
    enum: BookStatus,
  })
  status: BookStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
