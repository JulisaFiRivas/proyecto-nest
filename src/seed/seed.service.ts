import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { UserBookList } from 'src/lists/entities/user-book-list.entity/user-book-list.entity';
import { BOOK_SEED } from './data/book.seed';
import { USERS_SEED } from './data/user.seed';
import { ratingsData } from './data/rating.seed';
import { COMMENTS_SEED } from './data/comment.seed';
import { LISTS_SEED } from './data/list.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(UserBookList)
    private readonly listRepository: Repository<UserBookList>,
  ) {}

  async populateDB() {
    const queryRunner = this.bookRepository.manager.connection.createQueryRunner();
    
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // 1. Desactivar las restricciones de clave foránea temporalmente
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');

      // 2. Limpiar datos existentes (en orden inverso por las relaciones)
      await queryRunner.query('TRUNCATE TABLE userbooklist');
      await queryRunner.query('TRUNCATE TABLE comment');
      await queryRunner.query('TRUNCATE TABLE rating');
      await queryRunner.query('TRUNCATE TABLE book');
      await queryRunner.query('TRUNCATE TABLE user');

      // 3. Reactivar las restricciones de clave foránea
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');

      // 4. Insertar usuarios con contraseñas hasheadas
      const usersToInsert = await Promise.all(
        USERS_SEED.map(async (user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
          profile_picture: user.profile_picture || undefined,
          role: user.role,
        })),
      );
      const insertedUsers = await this.userRepository.save(usersToInsert);

      // 5. Insertar libros
      const insertedBooks = await this.bookRepository.save(BOOK_SEED);

      // 6. Insertar ratings
      const ratingsToInsert = ratingsData.map((rating) => ({
        score: rating.score,
        user: { id: rating.user_id },
        book: { id: rating.book_id },
      }));
      const insertedRatings = await this.ratingRepository.save(ratingsToInsert);

      // 7. Insertar comentarios
      const commentsToInsert = COMMENTS_SEED.map((comment) => ({
        id: comment.id,
        content: comment.content,
        user: { id: comment.user_id },
        book: { id: comment.book_id },
        parent_comment: comment.parent_comment_id ? { id: comment.parent_comment_id } : null,
      }));
      const insertedComments = await this.commentRepository.save(commentsToInsert);

      // 8. Insertar listas de usuario-libro
      const listsToInsert = LISTS_SEED.map((list) => ({
        id: list.id,
        status: list.status,
        user: { id: list.user_id },
        book: { id: list.book_id },
      }));
      const insertedLists = await this.listRepository.save(listsToInsert);

      await queryRunner.commitTransaction();

      return {
        success: true,
        message: 'Base de datos poblada exitosamente',
        data: {
          users: insertedUsers.length,
          books: insertedBooks.length,
          ratings: insertedRatings.length,
          comments: insertedComments.length,
          lists: insertedLists.length,
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        success: false,
        message: 'Error al poblar la base de datos',
        error: error.message,
      };
    } finally {
      await queryRunner.release();
    }
  }
}
