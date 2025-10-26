import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/ratings/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateCommentDto) {
    // Validate book and user existence (if repositories are available)
    const book = await this.bookRepository.findOneBy({ id: dto.book_id } as any);
    if (!book) throw new NotFoundException(`Libro con id ${dto.book_id} no encontrado`);

    const user = await this.userRepository.findOneBy({ id: dto.user_id } as any);
    if (!user) throw new NotFoundException(`Usuario con id ${dto.user_id} no encontrado`);

    const comment = this.commentRepository.create({
      content: dto.content,
      user_id: dto.user_id,
      book_id: dto.book_id,
      parent_comment_id: dto.parent_comment_id ?? null,
    } as any);

    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findByBook(book_id: number) {
    return this.commentRepository.find({ where: { book_id } });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOneBy({ id } as any);
    if (!comment) throw new NotFoundException(`Comment con id ${id} no encontrado`);
    return comment;
  }

  async remove(id: number) {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Comment con id ${id} no encontrado`);
    return { deleted: true };
  }

  async replace(id: number, dto: CreateCommentDto) {
    await this.findOne(id);
    const toSave = {
      id,
      content: dto.content,
      user_id: dto.user_id,
      book_id: dto.book_id,
      parent_comment_id: dto.parent_comment_id ?? null,
    } as any;

    return this.commentRepository.save(toSave);
  }

  async update(id: number, dto: UpdateCommentDto) {
    const comment = await this.findOne(id);
    Object.assign(comment, dto);
    return this.commentRepository.save(comment as any);
  }
}
