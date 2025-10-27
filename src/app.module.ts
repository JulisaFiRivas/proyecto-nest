import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { SeedModule } from './seed/seed.module';
import { RatingsModule } from './ratings/ratings.module';
import { User } from './users/entities/user.entity';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { Rating } from './ratings/entities/rating.entity';
import { Comment } from './comments/entities/comment.entity';
import { ListsModule } from './lists/lists.module';
import { UserBookList } from './lists/entities/user-book-list.entity/user-book-list.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASS ?? '',
      database: process.env.DB_NAME ?? 'libroteca',
      entities: [Book, Rating, User, Comment, UserBookList],
      synchronize: false,
      logging: false,
    }),
  BooksModule,
  SeedModule,
  RatingsModule,
  CommentsModule,UsersModule,
  ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
