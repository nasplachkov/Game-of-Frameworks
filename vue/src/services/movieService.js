import { httpClient } from "./httpClient";

function createMovieService() {
  return {
    get baseUrl() {
      return "https://practce-on-focus.firebaseio.com";
    },
    get favorites() {
      return "favorites";
    },
    getFavorites(userId) {
      return httpClient.get(`${this.baseUrl}/${this.favorites}/${userId}.json`);
    },
    addToFavorite(userId, movie) {
      return httpClient.put(
        `${this.baseUrl}/${this.favorites}/${userId}/${movie.id}.json`,
        movie
      );
    },
    deleteToFavorite(userId, movie) {
      return httpClient.delete(
        `${this.baseUrl}/${this.favorites}/${userId}/${movie.id}.json`
      );
    },
    addReview(userId, movieId, review) {
      return httpClient.patch(
        `${this.baseUrl}/${this.favorites}/${userId}/${movieId}.json`,
        review
      );
    },
    addRating(userId, movieId, rating) {
      return httpClient.patch(
        `${this.baseUrl}/${this.favorites}/${userId}/${movieId}.json`,
        rating
      );
    }
  };
}

export let movieService = createMovieService();
