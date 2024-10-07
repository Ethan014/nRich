import { IsNumber, IsString } from 'class-validator';

export class RecommendMovieDto {
  @IsString()
  facebookUrl: string;

  @IsString()
  movieName: string;

  @IsNumber()
  rank: number;
}