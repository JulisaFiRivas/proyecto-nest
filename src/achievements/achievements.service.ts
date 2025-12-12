import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { AchievementType, AchievementDefinition } from './interfaces/achievement-type.enum';
import { ACHIEVEMENT_DEFINITIONS } from '../seed/data/achievement-definitions';
import { UserBookList, BookStatus } from '../lists/entities/user-book-list.entity/user-book-list.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { UserStatsDto } from './dto/achievement-response.dto';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(UserBookList)
    private readonly userBookListRepository: Repository<UserBookList>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  /**
   * Obtiene todos los logros de un usuario
   */
  async getUserAchievements(userId: number): Promise<Achievement[]> {
    return this.achievementRepository.find({
      where: { user_id: userId },
      order: { unlocked_at: 'DESC' },
    });
  }

  /**
   * Obtiene estadísticas completas de un usuario
   */
  async getUserStats(userId: number): Promise<UserStatsDto> {
    const achievements = await this.getUserAchievements(userId);

    const totalBooksRead = await this.userBookListRepository.count({
      where: { user: { id: userId }, status: BookStatus.LEIDO },
    });

    const totalComments = await this.commentRepository.count({
      where: { user_id: userId },
    });

    const totalRatings = await this.ratingRepository.count({
      where: { user_id: userId },
    });

    return {
      totalBooksRead,
      totalComments,
      totalRatings,
      achievements: achievements.map(a => ({
        id: a.id,
        achievement_type: a.achievement_type,
        name: a.name,
        description: a.description,
        icon: a.icon,
        unlocked_at: a.unlocked_at,
      })),
    };
  }

  /**
   * Desbloquea un logro si aún no lo tiene
   */
  async unlockAchievement(
    userId: number,
    achievementType: AchievementType,
  ): Promise<Achievement | null> {
    // Verificar si ya tiene el logro
    const existing = await this.achievementRepository.findOne({
      where: { user_id: userId, achievement_type: achievementType },
    });

    if (existing) {
      return null; // Ya lo tiene
    }

    // Buscar definición del logro
    const definition = ACHIEVEMENT_DEFINITIONS.find(d => d.type === achievementType);
    if (!definition) {
      throw new NotFoundException(`Achievement type ${achievementType} not found`);
    }

    // Crear y guardar el logro
    const achievement = this.achievementRepository.create({
      user_id: userId,
      achievement_type: achievementType,
      name: definition.name,
      description: definition.description,
      icon: definition.icon,
    });

    return this.achievementRepository.save(achievement);
  }

  /**
   * Verifica y desbloquea logros basados en la actividad del usuario
   */
  async checkAndUnlockAchievements(userId: number): Promise<Achievement[]> {
    const unlockedAchievements: Achievement[] = [];

    // Contar actividades del usuario
    const booksRead = await this.userBookListRepository.count({
      where: { user: { id: userId }, status: BookStatus.LEIDO },
    });

    const commentsCount = await this.commentRepository.count({
      where: { user_id: userId },
    });

    const ratingsCount = await this.ratingRepository.count({
      where: { user_id: userId },
    });

    // Verificar logros de comentarios
    if (commentsCount === 1) {
      const achievement = await this.unlockAchievement(userId, AchievementType.FIRST_COMMENT);
      if (achievement) unlockedAchievements.push(achievement);
    }
    if (commentsCount >= 10) {
      const achievement = await this.unlockAchievement(userId, AchievementType.ACTIVE_COMMENTER_10);
      if (achievement) unlockedAchievements.push(achievement);
    }
    if (commentsCount >= 50) {
      const achievement = await this.unlockAchievement(userId, AchievementType.ACTIVE_COMMENTER_50);
      if (achievement) unlockedAchievements.push(achievement);
    }

    // Verificar logros de ratings
    if (ratingsCount === 1) {
      const achievement = await this.unlockAchievement(userId, AchievementType.FIRST_RATING);
      if (achievement) unlockedAchievements.push(achievement);
    }
    if (ratingsCount >= 25) {
      const achievement = await this.unlockAchievement(userId, AchievementType.BOOK_CRITIC);
      if (achievement) unlockedAchievements.push(achievement);
    }

    // Verificar logros de libros leídos
    if (booksRead >= 5) {
      const achievement = await this.unlockAchievement(userId, AchievementType.BOOKS_READ_5);
      if (achievement) unlockedAchievements.push(achievement);
    }
    if (booksRead >= 10) {
      const achievement = await this.unlockAchievement(userId, AchievementType.BOOKS_READ_10);
      if (achievement) unlockedAchievements.push(achievement);
    }
    if (booksRead >= 25) {
      const achievement = await this.unlockAchievement(userId, AchievementType.BOOKS_READ_25);
      if (achievement) unlockedAchievements.push(achievement);
    }

    return unlockedAchievements;
  }
}
