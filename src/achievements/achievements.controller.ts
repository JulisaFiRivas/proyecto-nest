import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  /**
   * Obtiene los logros de un usuario específico
   * Endpoint: GET /achievements/user/:userId
   */
  @Get('user/:userId')
  @Auth()
  async getUserAchievements(@Param('userId', ParseIntPipe) userId: number) {
    return this.achievementsService.getUserAchievements(userId);
  }

  /**
   * Obtiene estadísticas completas de un usuario
   * Endpoint: GET /achievements/stats/:userId
   */
  @Get('stats/:userId')
  @Auth()
  async getUserStats(@Param('userId', ParseIntPipe) userId: number) {
    return this.achievementsService.getUserStats(userId);
  }
}
