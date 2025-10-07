import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  controllers: [SeedController],
  imports: [BooksModule],
  providers: [SeedService],
})
export class SeedModule {}
