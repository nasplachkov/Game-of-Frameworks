export default function () {
  return {
    auth: {
      user: null
    },
    movies: {
      search: '',
      onlyFavorites: true,
      genres: {},
      movies: [],
      favoriteMovies: {}
    }
  };
}
