import { AchievementType, AchievementDefinition } from 'src/achievements/interfaces/achievement-type.enum';

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    type: AchievementType.FIRST_COMMENT,
    name: 'Primera Opinión',
    description: 'Has publicado tu primer comentario',
    icon: '💬',
  },
  {
    type: AchievementType.FIRST_RATING,
    name: 'Primer Crítico',
    description: 'Has dado tu primera calificación',
    icon: '⭐',
  },
  {
    type: AchievementType.BOOKS_READ_5,
    name: 'Lector Principiante',
    description: 'Has marcado 5 libros como leídos',
    icon: '📚',
  },
  {
    type: AchievementType.BOOKS_READ_10,
    name: 'Lector Ávido',
    description: 'Has marcado 10 libros como leídos',
    icon: '📖',
  },
  {
    type: AchievementType.BOOKS_READ_25,
    name: 'Devorador de Libros',
    description: 'Has marcado 25 libros como leídos',
    icon: '🏆',
  },
  {
    type: AchievementType.ACTIVE_COMMENTER_10,
    name: 'Conversador Activo',
    description: 'Has publicado 10 comentarios',
    icon: '💭',
  },
  {
    type: AchievementType.ACTIVE_COMMENTER_50,
    name: 'Crítico Literario',
    description: 'Has publicado 50 comentarios',
    icon: '📝',
  },
  {
    type: AchievementType.BOOK_CRITIC,
    name: 'Crítico Profesional',
    description: 'Has calificado 25 libros',
    icon: '🌟',
  },
];
