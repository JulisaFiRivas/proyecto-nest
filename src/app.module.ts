import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { SeedModule } from './seed/seed.module';
import { RatingsModule } from './ratings/ratings.module';
import { User } from './ratings/entities/user.entity';


@Module({
  imports: [BooksModule, SeedModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
