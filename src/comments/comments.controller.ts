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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Auth()
  create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User) {
    return this.commentsService.create(createCommentDto, user.id);
  }

  @Get()
  findAll(@Query('book_id') book_id?: string) {
    if (book_id) return this.commentsService.findByBook(+book_id);
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.commentsService.remove(id, user.id);
  }

  @Put(':id')
  @Auth()
  replace(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCommentDto, @GetUser() user: User) {
    return this.commentsService.replace(id, dto, user.id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto, @GetUser() user: User) {
    return this.commentsService.update(id, dto, user.id);
  }
}
