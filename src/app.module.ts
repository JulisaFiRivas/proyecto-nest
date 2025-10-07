import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [BooksModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
