import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { UserBookList } from './entities/user-book-list.entity/user-book-list.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity'; // <-- agrega esta línea

@Module({
  imports: [TypeOrmModule.forFeature([UserBookList, Book, User])], // <-- agrega User aquí
  controllers: [ListsController],
  providers: [ListsService],
  exports: [TypeOrmModule],
})
export class ListsModule {}