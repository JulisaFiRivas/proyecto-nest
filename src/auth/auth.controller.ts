import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { AchievementsService } from '../achievements/achievements.service';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly achievementsService: AchievementsService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@GetUser() user: User) {
    const achievements = await this.achievementsService.getUserAchievements(user.id);
    return {
      ...user,
      achievements,
    };
  }
  //Ruta solo accesible por el ADMIN
  @Get('private1')
  @Auth(ValidRoles.admin)
  privateRoute1(
    @GetUser() user: any
  ) {
    return {
      ok: true,
      message: 'Hola Admin.',
      user
    };
  }
}
