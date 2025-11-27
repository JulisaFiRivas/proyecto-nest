import { IsString, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  synopsis?: string;

  @IsString()
  @IsOptional()
  cover_image_url?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
