import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { AchievementsService } from '../achievements/achievements.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly achievementsService: AchievementsService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(
    @Query('username') username?: string,
    @Query('email') email?: string,
  ) {
    if (username) return this.usersService.findByUsername(username);
    if (email) return this.usersService.findByEmail(email);
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.usersService.remove(id, user.id, user.role);
  }

  @Put(':id')
  @Auth()
  replace(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUserDto, @GetUser() user: User) {
    return this.usersService.replace(id, dto, user.id, user.role);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(id, dto, user.id, user.role);
  }

  @Get(':id/achievements')
  @Auth()
  async getUserAchievements(@Param('id', ParseIntPipe) id: number) {
    return this.achievementsService.getUserAchievements(id);
  }

  @Get(':id/stats')
  @Auth()
  async getUserStats(@Param('id', ParseIntPipe) id: number) {
    return this.achievementsService.getUserStats(id);
  }
}
