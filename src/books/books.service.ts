// src/books/books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: '1984', author: 'George Orwell', genre: 'Distopía', description: 'Un clásico de la literatura.' },
    { id: 2, title: 'El Señor de los Anillos', author: 'J.R.R. Tolkien', genre: 'Fantasía', description: 'La gran aventura de la Tierra Media.' },
  ];

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
