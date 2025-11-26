import { Rating } from 'src/ratings/entities/rating.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { UserBookList } from '../../lists/entities/user-book-list.entity/user-book-list.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_picture?: string;

  @Column({
    type: 'enum',
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  })
  role: 'USER' | 'ADMIN';

  // Relaciones
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

    // Relación inversa vice
  @OneToMany(() => UserBookList, (userBookList) => userBookList.user)
  bookLists: UserBookList[];
}
