import { IsArray, IsNumber, IsString } from 'class-validator';

export class AddNewMovieDto {
  @IsArray()
  genres: [string];

  @IsString()
  name: string;
  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsString()
  director: string;

  @IsNumber()
  duration: number;
}