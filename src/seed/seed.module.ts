import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { CommentsModule } from 'src/comments/comments.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  controllers: [SeedController],
  imports: [BooksModule, UsersModule, RatingsModule, CommentsModule, ListsModule],
  providers: [SeedService],
})
export class SeedModule {}
