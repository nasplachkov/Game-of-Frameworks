export function setSearch(search) {
  return {
    type: 'SET_SEARCH',
    data: search
  };
}

export function setGenres(genres) {
  return {
    type: 'SET_GENRES',
    data: genres
  };
}

export function setMovies(movies) {
  return {
    type: 'SET_MOVIES',
    data: movies
  };
}

export function setFavorites(movies) {
  return {
    type: 'SET_FAVORITES',
    data: movies
  };
}

export function showFavorites(value) {
  return {
    type: 'SHOW_FAVORITES',
    data: !!value
  };
}

export function addToFavorites(movie) {
  return {
    type: 'ADD_TO_FAVORITES',
    data: movie
  };
}

export function editMovie(movieId, newData) {
  return {
    type: 'EDIT_MOVIE',
    data: {
      movieId,
      newData
    }
  };
}
