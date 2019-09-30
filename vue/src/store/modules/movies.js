export default {
  state: {
    onlyFavorites: true,
    genres: {},
    movies: {},
    favoriteMovies: {}
  },
  getters: {
    getFavorites: state => state.favoriteMovies,
    getFavoriteById: state => id => state.favoriteMovies[id],
    getGenres: state => state.genres,
    getMovies: state => state.movies,
    getSearch: state => state.search,
    getOnlyFavorites: state => state.onlyFavorites
  },
  mutations: {
    setFavorites(state, favorites) {
      state.favoriteMovies = { ...favorites };
    },
    setGenres(state, genres) {
      state.genres = { ...genres };
    },
    setMovies(state, movies) {
      state.movies = { ...movies };
    },
    setOnlyFavorites(state, onlyFavorites) {
      state.onlyFavorites = onlyFavorites;
    }
  },
  actions: {
    setFavorites(context, payload) {
      context.commit("setFavorites", payload);
    },
    setGenres(context, payload) {
      context.commit("setGenres", payload);
    },
    setMovies(context, payload) {
      context.commit("setMovies", payload);
    },
    setOnlyFavorites(context, payload) {
      context.commit("setOnlyFavorites", payload);
    }
  }
};
