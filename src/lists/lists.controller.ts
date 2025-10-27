import { Controller, Post, Get, Patch, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateUserBookListDto } from './dto/create-user-book-list.dto/create-user-book-list.dto';
import { UpdateUserBookListDto } from './dto/update-user-book-list.dto/update-user-book-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreateUserBookListDto) {
    return this.listsService.create(dto);
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.listsService.findByUser(userId);
  }

  @Patch(':userId/:bookId')
  async updateStatus(
    @Param('userId') userId: number,
    @Param('bookId') bookId: number,
    @Body() dto: UpdateUserBookListDto,
  ) {
    return this.listsService.updateStatus(userId, bookId, dto.status);
  }

  @Delete(':userId/:bookId')
  async remove(@Param('userId') userId: number, @Param('bookId') bookId: number) {
    return this.listsService.remove(userId, bookId);
  }
}
