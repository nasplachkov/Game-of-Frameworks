import axios from 'axios';
import logger from './logger';

const API_KEY = '519e9b151c1dc701bf50e6824fbe3409';
// const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTllOWIxNTFjMWRjNzAxYmY1MGU2ODI0ZmJlMzQwOSIsInN1YiI6IjVkOGNiYTU0YWJmOGUyMDAxOTc5NmRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hu4idvjPhd0wpzM-ktzXcLuXCx7hXNXoB30h_ypXaiY';
const BASE_URL = 'https://api.themoviedb.org/3';

class MovieDBService {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL
    });
    logger.addInterceptor(this.client);
  }

  search(title, page = 1) {
    return this.client.get('/search/movie', {
      params: {
        api_key: API_KEY,
        query: title,
        page
      }
    }).then(
      (response) => {
        return response.data && response.data.results;
      }
    );
  }

  getGenres() {
    return this.client.get('/genre/movie/list', {
      params: {
        api_key: API_KEY
      }
    }).then(
      (response) => {
        const genres = {};
        if (response && response.data && response.data.genres) {
          response.data.genres.forEach(genre => genres[genre.id] = genre);
        }
        return genres;
      }
    );
  }

  getMovieTrailers(movieId) {
    return this.client.get(`/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY
      }
    }).then(
      (response) => {
        return response.data && response.data.results;
      }
    );
  }
}

export default new MovieDBService();
