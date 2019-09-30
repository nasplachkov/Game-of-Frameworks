import { httpClient } from "./httpClient";
import store from "../store/store";

function createMovieDbService() {
  return {
    get baseUrl() {
      return "https://api.themoviedb.org/3";
    },
    get apyKey() {
      return "?api_key=" + process.env.VUE_APP_TMDB_KEY;
    },
    searchByName(query) {
      return httpClient
        .get(this.baseUrl + "/search/movie" + this.apyKey + "&query=" + query)
        .catch();
    },
    getGenres() {
      return httpClient
        .get(this.baseUrl + "/genre/movie/list" + this.apyKey)
        .then(response => {
          const genres = {};
          if (response && response.data && response.data.genres) {
            response.data.genres.forEach(genre => (genres[genre.id] = genre));
          }
          store.commit("setGenres", genres);
        });
    },
    getMovieTrailers(movieId) {
      return httpClient.get(
        `${this.baseUrl}/movie/${movieId}/videos${this.apyKey}`
      );
    }
  };
}

export let movieDbService = createMovieDbService();
