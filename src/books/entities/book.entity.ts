import { Comment } from '../../comments/entities/comment.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBookList } from '../../lists/entities/user-book-list.entity/user-book-list.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  synopsis?: string;

  @Column({ nullable: true })
  cover_image_url?: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  genre?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Rating, (rating) => rating.book)
  ratings?: Rating[];

  @OneToMany(() => Comment, (comment) => comment.book)
  comments?: Comment[];

  @OneToMany(() => UserBookList, (userBookList) => userBookList.book)
  userLists: UserBookList[];
}