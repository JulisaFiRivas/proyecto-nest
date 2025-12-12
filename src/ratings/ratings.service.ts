// src/ratings/ratings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Book } from 'src/books/entities/book.entity';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,

    @InjectRepository(Book) // Inyectamos el Repositorio de Book
    private readonly bookRepository: Repository<Book>,

    private readonly achievementsService: AchievementsService,
  ) {}

  /**
   * [CREATE / UPDATE]
   * Crea o actualiza la puntuación de un libro para un usuario.
   */
  async createOrUpdate(
    dto: CreateRatingDto,
    book_id: number,
    user_id: number,
  ) {
    // 1. Validamos que el libro exista
    const book = await this.bookRepository.findOneBy({ id: book_id });
    if (!book) {
      throw new NotFoundException(`Libro con ID ${book_id} no encontrado.`);
    }

    // 2. Usamos UPSERT:
    // Gracias a tu 'UNIQUE KEY (user_id, book_id)', esto
    // insertará si no existe, o actualizará si ya existe.
    await this.ratingRepository.upsert(
      {
        score: dto.score,
        user_id: user_id,
        book_id: book_id,
      },
      ['user_id', 'book_id'], // Los campos que forman la llave única
    );

    // Desbloquear logros automáticamente
    try {
      await this.achievementsService.checkAndUnlockAchievements(user_id);
    } catch (error) {
      console.error('Error al verificar logros:', error);
    }

    // 3. Devolvemos el promedio actualizado
    return this.getAverageRatingForBook(book_id);
  }

  /**
   * [READ]
   * Obtiene el puntaje promedio y el total de votos de un libro.
   */
  async getAverageRatingForBook(book_id: number) {
    
    // Usamos QueryBuilder para hacer cálculos (AVG y COUNT)
    const stats = await this.ratingRepository
      .createQueryBuilder('rating') // 'rating' es un alias para la tabla Rating
      .select('AVG(rating.score)', 'average') // Calcula el promedio
      .addSelect('COUNT(rating.id)', 'totalRatings') // Cuenta el total
      .where('rating.book_id = :id', { id: book_id }) // Filtra por libro
      .getRawOne(); // Obtiene un solo resultado "crudo"

    if (!stats.average) {
      return {
        book_id: book_id,
        average: 0,
        totalRatings: 0,
      };
    }

    return {
      book_id: book_id,
      // Convertimos los strings a números
      average: parseFloat(parseFloat(stats.average).toFixed(1)),
      totalRatings: parseInt(stats.totalRatings, 10),
    };
  }
}