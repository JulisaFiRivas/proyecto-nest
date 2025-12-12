export enum AchievementType {
  FIRST_COMMENT = 'FIRST_COMMENT',
  FIRST_RATING = 'FIRST_RATING',
  BOOKS_READ_5 = 'BOOKS_READ_5',
  BOOKS_READ_10 = 'BOOKS_READ_10',
  BOOKS_READ_25 = 'BOOKS_READ_25',
  ACTIVE_COMMENTER_10 = 'ACTIVE_COMMENTER_10',
  ACTIVE_COMMENTER_50 = 'ACTIVE_COMMENTER_50',
  BOOK_CRITIC = 'BOOK_CRITIC', // 25+ ratings
}

export interface AchievementDefinition {
  type: AchievementType;
  name: string;
  description: string;
  icon: string;
}
