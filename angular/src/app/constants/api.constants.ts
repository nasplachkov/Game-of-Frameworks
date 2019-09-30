import { environment } from '../../environments/environment';

/**
 * Holds all the api request urls.
 * @type any
 */
export const apiRequests = {
  authentication: {
    register: `${environment.authApiUrl}accounts:signUp?key=${environment.firebaseApiKey}`,
    login: `${environment.authApiUrl}accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
  },
  movies: {
    search: `${environment.movieDbBaseUrl}/search/movie?api_key=${environment.movieDbApiKey}`,
    getGenres: `${environment.movieDbBaseUrl}/genre/movie/list?api_key=${environment.movieDbApiKey}`,
    getMovieTrailers: (movieId) => `${environment.movieDbBaseUrl}/movie/${movieId}/videos?api_key=${environment.movieDbApiKey}`,
    favorites: (userId) => `${environment.firebaseApiUrl}/favorites/${userId}.json?key=${environment.firebaseApiKey}`,
    favoriteMovie: (userId, movie) => `${environment.firebaseApiUrl}/favorites/${userId}/${movie.id}.json?key=${environment.firebaseApiKey}`
  }
};
