import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { Achievement } from './entities/achievement.entity';
import { UserBookList } from '../lists/entities/user-book-list.entity/user-book-list.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Rating } from '../ratings/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achievement, UserBookList, Comment, Rating]),
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService],
  exports: [AchievementsService],
})
export class AchievementsModule {}
