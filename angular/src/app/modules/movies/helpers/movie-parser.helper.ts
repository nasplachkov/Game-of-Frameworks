import { Movie } from '../../../models/movie.model';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
/**
 * returns a copy of the input movie with the appropriate poster path.
 * @param movie
 * @returns
 */
export const parseMovieData = (movie: Movie): Movie => {

  return {
    ...movie,
    poster_path: movie.poster_path ? BASE_POSTER_URL + movie.poster_path : '/assets/images/blank-image.png'
  }
};
