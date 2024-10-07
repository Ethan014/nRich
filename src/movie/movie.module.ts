import { Module } from '@nestjs/common';

import { MovieManager } from './movie.manager';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieDao } from './movie.dao';


@Module({
  imports: [],
  providers: [MovieManager, MovieService,MovieDao],
  exports: [MovieManager],
  controllers: [MovieController],
})
export class MovieModule {}
