// src/ratings/ratings.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { AuthGuard } from '@nestjs/passport'; // <-- Asumo que usas JWT

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  /**
   * [CREATE / UPDATE]
   * Endpoint: POST /books/:book_id/rating
   * Protegido por autenticación.
   */
  @Post(':book_id/rating')
  @UseGuards(AuthGuard('jwt')) // Protege esta ruta
  create(
    @Param('book_id', ParseIntPipe) book_id: number,
    @Body() createRatingDto: CreateRatingDto,
    @Req() req: any, // Usamos @Req para obtener el usuario del token
  ) {
    // req.user.id viene del payload del token JWT
    const user_id = req.user.id; 
    return this.ratingsService.createOrUpdate(createRatingDto, book_id, user_id);
  }

  /**
   * [READ]
   * Endpoint: GET /books/:book_id/rating
   * Es público, no necesita @UseGuards
   */
  @Get(':book_id/rating')
  findOne(@Param('book_id', ParseIntPipe) book_id: number) {
    return this.ratingsService.getAverageRatingForBook(book_id);
  }
}