import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedController],
  imports: [BooksModule, UsersModule],
  providers: [SeedService],
})
export class SeedModule {}
