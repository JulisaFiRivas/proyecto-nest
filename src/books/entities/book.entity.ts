import { Comment } from '../../comments/entities/comment.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBookList } from '../../lists/entities/user-book-list.entity/user-book-list.entity';


@Entity('Book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Rating, (rating) => rating.book)
  ratings?: Rating[];

  @OneToMany(() => Comment, (comment) => comment.book)
  comments?: Comment[];
    // Relación inversa vice
  @OneToMany(() => UserBookList, (userBookList) => userBookList.book)
  userLists: UserBookList[];
}