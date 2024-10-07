/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body } from "@nestjs/common";
import { MovieManager } from "./movie.manager";
import { AddNewMovieDto } from "./dto/add-new-movie.dto";
import { RecommendMovieDto } from "./dto/recommend-movie.dto";
import { JoiValidationPipe } from "src/core/validations/joi-validation.pipe";
import { FilterValidations } from "./validations/add-new-movie-validation";

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieManager: MovieManager) {}

  @Get('getAllMovies')
  getAllMovies() {
    return this.movieManager.getAllMovies();
  }

  @Post('addNewMovie')
  addNewMovie(@Body(new JoiValidationPipe(FilterValidations.addNewMovieSchema())) movieData: AddNewMovieDto) {
    return this.movieManager.addNewMovie(movieData);
  }

  @Post('recommend')
  recommendMovie(@Body() recommendationData: RecommendMovieDto) {
    return this.movieManager.recommendMovie(
      recommendationData
    );
  }

  @Post('getRecommendations')
  getRecommendedMovies(@Body() getRecommendationsDto) {
    return this.movieManager.getRecommendedMovies(getRecommendationsDto.facebookUrl);
  }
  @Post('getSimilarUsers')
  getSimilarUsers(@Body() getSimilarUsersDto) {
    return this.movieManager.getSimilarUsers(getSimilarUsersDto.facebookUrl);
  }
}
