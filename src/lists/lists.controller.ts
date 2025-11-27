import { Controller, Post, Get, Patch, Delete, Body, Param, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateUserBookListDto } from './dto/create-user-book-list.dto/create-user-book-list.dto';
import { UpdateUserBookListDto } from './dto/update-user-book-list.dto/update-user-book-list.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  async findAll() {
  return this.listsService.findAll();
}

  @Post()
  @Auth()
  async create(@Body() dto: CreateUserBookListDto, @GetUser() user: User) {
    return this.listsService.create(dto, user.id);
  }

  @Get(':userId')
  @Auth()
  async findByUser(@Param('userId', ParseIntPipe) userId: number, @GetUser() user: User) {
    return this.listsService.findByUser(userId, user.id);
  }

  @Patch(':userId/:bookId')
  @Auth()
  async updateStatus(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() dto: UpdateUserBookListDto,
    @GetUser() user: User,
  ) {
    return this.listsService.updateStatus(userId, bookId, dto.status, user.id);
  }

  @Delete(':userId/:bookId')
  @Auth()
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @GetUser() user: User,
  ) {
    return this.listsService.remove(userId, bookId, user.id);
  }
}
