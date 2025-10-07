import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]  // Exportamos el servicio para otros módulos
})
export class BooksModule {}
