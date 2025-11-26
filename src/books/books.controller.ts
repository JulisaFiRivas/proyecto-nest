import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
//Para los roles
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }
  //Solo el admin puede publicar libros en el sitio
  @Post()
  @Auth(ValidRoles.admin)
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  //Solo admin puede borrar libros
  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }
  //Solo admin puede actualizar libros
  @Patch(':id')
  @Auth(ValidRoles.admin)
  async update(
    @Param('id') id: string, 
    @Body() createBookDto: CreateBookDto
  ): Promise<Book> {
    return this.booksService.update(+id, createBookDto);
  }
}
