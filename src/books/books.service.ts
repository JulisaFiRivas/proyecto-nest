// src/books/books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { BOOK_SEED } from '../seed/data/book.seed';

@Injectable()
export class BooksService {
  private books: Book[] = [...BOOK_SEED]; // Usar los datos del seed

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) throw new NotFoundException(`Libro con id ${id} no encontrado`);
    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.books.length + 1,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  remove(id: number): void {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException(`Libro con id ${id} no encontrado`);
    this.books.splice(index, 1);
  }
}
