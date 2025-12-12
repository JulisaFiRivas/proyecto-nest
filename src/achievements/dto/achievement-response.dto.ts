export class AchievementResponseDto {
  id: number;
  achievement_type: string;
  name: string;
  description: string;
  icon?: string;
  unlocked_at: Date;
}

export class UserStatsDto {
  totalBooksRead: number;
  totalComments: number;
  totalRatings: number;
  achievements: AchievementResponseDto[];
}
