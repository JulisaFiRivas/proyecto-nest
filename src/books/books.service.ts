import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { BOOK_SEED } from '../seed/data/book.seed';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {
    // Podemos inicializar la BD con los seeds si está vacía
    this.initializeBooks();
  }

  private async initializeBooks() {
    const count = await this.bookRepository.count();
    if (count === 0) {
      // Si no hay libros, insertamos los del seed
      const books = BOOK_SEED.map(book => this.bookRepository.create(book));
      await this.bookRepository.save(books);
      console.log('Base de datos inicializada con libros del seed');
    }
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      order: { id: 'ASC' },
      relations: ['userLists']
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['userLists']
    });
    if (!book) throw new NotFoundException(`Libro con id ${id} no encontrado`);
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Libro con id ${id} no encontrado`);
    }
  }
}