import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Book, User]),
    AchievementsModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService, TypeOrmModule],
})
export class CommentsModule {}
