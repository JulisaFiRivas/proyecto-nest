// src/ratings/ratings.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  /**
   * [CREATE / UPDATE]
   * Endpoint: POST /ratings/:book_id/rating
   * Protegido por autenticación.
   */
  @Post(':book_id/rating')
  @Auth()
  create(
    @Param('book_id', ParseIntPipe) book_id: number,
    @Body() createRatingDto: CreateRatingDto,
    @GetUser() user: User,
  ) {
    // user.id viene del JWT vía @GetUser()
    const user_id = user.id; 
    return this.ratingsService.createOrUpdate(createRatingDto, book_id, user_id);
  }

  /**
   * [READ]
   * Endpoint: GET /ratings/:book_id/rating
   * Es público, no necesita @UseGuards
   */
  @Get(':book_id/rating')
  findOne(@Param('book_id', ParseIntPipe) book_id: number) {
    return this.ratingsService.getAverageRatingForBook(book_id);
  }
}