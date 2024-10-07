/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { MovieDao } from './movie.dao';
import { neo4jDriver } from 'src/core/neo4j/neo4j.config';
import { AddNewMovieDto } from './dto/add-new-movie.dto';
import { RecommendMovieDto } from './dto/recommend-movie.dto';


@Injectable()
export class MovieService {
  private session;
  
  constructor(private movieDao: MovieDao,) {
    this.session = neo4jDriver.session();
  }
  async addNewMovie(movieData: AddNewMovieDto) {
    const query = `
    CREATE (m:Movie {title: $name, name: $name, year: $year, director: $director, duration: $duration, genre:$genre})
    RETURN m
  `;
    const result = await this.session.run(query, movieData);
    return result.records[0].get('m').properties;
  }
  async recommendMovie(recommendMovieDto: RecommendMovieDto) {
    const query = `
    MATCH (u:User {facebookUrl: $facebookUrl}), (m:Movie {title: $movieName})
    MERGE (u)-[r:RANKED {rank: $rank}]->(m)
    RETURN u, r, m;`
    const params = {
        facebookUrl: recommendMovieDto.facebookUrl,
        movieName: recommendMovieDto.movieName,
        rank: recommendMovieDto.rank,
  }
  const result = await this.session.run(query, params);
  return result.records[0].get('r').properties; 
}
  async getAllMovies() {
    const query = `MATCH (m:Movie) RETURN m`;
    const result = await this.session.run(query);
    return result.records.map(record => record.get('m').properties);
  }
  async getUserRanking(facebookUrl){
    const query = `
    MATCH (u:User {facebookUrl: $facebookUrl})-[r:RANKED]->(m:Movie)
    RETURN m.title AS MovieTitle, r.rank AS Rating`
    const result = await this.session.run(query,{ facebookUrl });
    return result.records.map(record => ({
      movieTitle: record.get('MovieTitle'),
      rating: record.get('Rating')
    }));
   }
  async getMoviesThatUserRanked(facebookUrl){
    const query = `
    MATCH (u:User {facebookUrl: $facebookUrl})-[r:RANKED]->(m:Movie)
    RETURN u.name AS UserName, COLLECT(m.title) AS MoviesRated`
    const result = await this.session.run(query,{ facebookUrl });
    return result.records.map(record => ({
      movieTitle: record.get('UserName'),
      rating: record.get('MoviesRated')
    }));
   }
  async getSimilarUsersBasedOnRating(facebookUrl: string) {
    const query = `
      MATCH (u1:User {facebookUrl: $facebookUrl})-[r1:RANKED]->(m:Movie)<-[r2:RANKED]-(u2:User)
      WHERE u1 <> u2 AND abs(r1.rank - r2.rank) <= 2
      RETURN u2.facebookUrl AS SimilarUser, collect(m.title) AS CommonMovies, avg(abs(r1.rank - r2.rank)) AS AvgRatingDifference
      ORDER BY AvgRatingDifference ASC
    `;
    const result = await this.session.run(query, { facebookUrl });
    const similarUsers = result.records.map(record => ({
      similarUser: record.get('SimilarUser'),
      commonMovies: record.get('CommonMovies'),
      avgRatingDifference: record.get('AvgRatingDifference'),
    }));
    return similarUsers;
  }
  async getRecommendedHighRatedMovies(facebookUrl: string, rank:number = 2, commonRanking: number = 2) {
    const query = `
      MATCH (u1:User {facebookUrl: $facebookUrl})-[r1:RANKED]->(m:Movie)<-[r2:RANKED]-(u2:User)
      WHERE u1 <> u2 AND abs(r1.rank - r2.rank) <= 2
      AND r2.rank >= 8
      RETURN DISTINCT m.title AS RecommendedMovie, AVG(r2.rank) AS AvgRating
      ORDER BY AvgRating DESC
      LIMIT 5
    `;
    const result = await this.session.run(query, { facebookUrl });
    return result.records.map(record => ({
      movie: record.get('RecommendedMovie'),
      avgRating: record.get('AvgRating')
    }));
  }
  
  async getAverageRatingsForMovies() {
    const query = `
    MATCH (m:Movie)<-[r:RANKED]-()
    RETURN m.title AS MovieTitle, AVG(r.rank) AS AverageRating
    ORDER BY AverageRating DESC
    `;
    const result = await this.session.run(query);
    const averageRatings = result.records.map(record => ({
      movie: record.get('MovieTitle'),
      averageRating: record.get('AverageRating'),
    }));
  
    return averageRatings;
  }
  async getAllRatingsForMovie(movieTitle: string) {
    const query = `
      MATCH (u:User)-[r:RANKED]->(m:Movie {title: $movieTitle})
      RETURN u.name AS UserName, r.rank AS UserRating
    `;
    const result = await this.session.run(query, { movieTitle });
    const ratings = result.records.map(record => ({
      user: record.get('UserName'),
      rating: record.get('UserRating'),
    }));
  
    return ratings;
  }
}
