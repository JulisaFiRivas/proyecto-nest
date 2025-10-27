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

  // CREATE
  ç
  
  async create(createUserBookListDto: CreateUserBookListDto): Promise<UserBookList> {
    const { userId, bookId, status } = createUserBookListDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!user || !book) throw new NotFoundException('User or Book not found');

    const userBookList = this.userBookListRepository.create({
      user,
      book,
      status,
    });

    return this.userBookListRepository.save(userBookList);
  }

  // READ - obtener las listas de un usuario
  async findByUser(userId: number): Promise<UserBookList[]> {
    return this.userBookListRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
      order: { id: 'DESC' },
    });
  }

  // UPDATE - cambiar estado del libro (DESEO_LEER -> LEIDO)
  async updateStatus(userId: number, bookId: number, status: string): Promise<UserBookList> {
    const listItem = await this.userBookListRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
      relations: ['user', 'book'],
    });

    if (!listItem) throw new NotFoundException('Item not found');

    listItem.status = status as any;
    return this.userBookListRepository.save(listItem);
  }

  // DELETE - quitar libro de la lista
  async remove(userId: number, bookId: number): Promise<void> {
    const listItem = await this.userBookListRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (!listItem) throw new NotFoundException('Item not found');

    await this.userBookListRepository.remove(listItem);
  }

  
}
