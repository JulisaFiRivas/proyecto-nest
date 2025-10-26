// src/ratings/dto/create-rating.dto.ts
import { IsInt, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsInt({ message: 'El puntaje debe ser un número entero' })
  @Min(1, { message: 'El puntaje mínimo es 1' })
  @Max(5, { message: 'El puntaje máximo es 5' })
  score: number;
}