/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddNewMovieDto } from './dto/add-new-movie.dto';
import { RecommendMovieDto } from './dto/recommend-movie.dto';


@Injectable()
export class MovieManager {
  constructor(private movieService: MovieService,) {}

  getRecommendedMovies(facebookUrl: string) {
    return this.movieService.getRecommendedHighRatedMovies(facebookUrl)
  }
  getSimilarUsers(facebookUrl: string) {
    return this.movieService.getSimilarUsersBasedOnRating(facebookUrl)
  }
  recommendMovie(recommendMovieDto: RecommendMovieDto) {
    return this.movieService.recommendMovie(recommendMovieDto)
  }
  addNewMovie(movieData: AddNewMovieDto) {
    return this.movieService.addNewMovie(movieData)
  }
  getAllMovies(){
    return this.movieService.getAllMovies()
  }
}
