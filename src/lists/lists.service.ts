import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBookList } from '../lists/entities/user-book-list.entity/user-book-list.entity';
import { CreateUserBookListDto } from '../lists/dto/create-user-book-list.dto/create-user-book-list.dto';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(UserBookList)
    private readonly userBookListRepository: Repository<UserBookList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // CREAT
  
  async create(createUserBookListDto: CreateUserBookListDto, userId: number): Promise<UserBookList> {
    const { bookId, status } = createUserBookListDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      console.log(`User ${userId} not found in database`);
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      console.log(`Book ${bookId} not found in database`);
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    console.log('Found user:', user);
    console.log('Found book:', book);

    const userBookList = this.userBookListRepository.create({
      user,
      book,
      status,
    });

    return this.userBookListRepository.save(userBookList);
  }

  // READ - obtener las listas de un usuario
  async findByUser(userId: number, requestingUserId: number): Promise<UserBookList[]> {
    // Verificar que el usuario solo pueda ver sus propias listas
    if (userId !== requestingUserId) {
      throw new NotFoundException(`No tienes permiso para ver las listas de otro usuario`);
    }
    return this.userBookListRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
      order: { id: 'DESC' },
    });
  }

  // UPDATE - cambiar estado del libro (DESEO_LEER -> LEIDO)
  async updateStatus(userId: number, bookId: number, status: string, requestingUserId: number): Promise<UserBookList> {
    // Verificar que el usuario solo pueda actualizar sus propias listas
    if (userId !== requestingUserId) {
      throw new NotFoundException(`No tienes permiso para actualizar las listas de otro usuario`);
    }
    const listItem = await this.userBookListRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
      relations: ['user', 'book'],
    });

    if (!listItem) throw new NotFoundException('Item not found');

    listItem.status = status as any;
    return this.userBookListRepository.save(listItem);
  }

  async findAll(): Promise<UserBookList[]> {
  return this.userBookListRepository.find({
    relations: ['user', 'book'],
    order: { id: 'DESC' },
  });
}
  // DELETE - quitar libro de la lista
  async remove(userId: number, bookId: number, requestingUserId: number): Promise<void> {
    // Verificar que el usuario solo pueda eliminar sus propias listas
    if (userId !== requestingUserId) {
      throw new NotFoundException(`No tienes permiso para eliminar las listas de otro usuario`);
    }
    const listItem = await this.userBookListRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (!listItem) throw new NotFoundException('Item not found');

    await this.userBookListRepository.remove(listItem);
  }

  
}
