/* eslint no-fallthrough: 0 */
export function moviesReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.data
      };
    case 'SET_GENRES':
      return {
        ...state,
        genres: action.data
      };

    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.data,
        onlyFavorites: false
      };

    case 'SET_FAVORITES':
      return {
        ...state,
        favoriteMovies: action.data
      };

    case 'SHOW_FAVORITES':
      return {
        ...state,
        onlyFavorites: action.data
      };

    case 'ADD_TO_FAVORITES':
      {
        const movie = { ...action.data };
        const favoriteMovies = { ...state.favoriteMovies };
        if (favoriteMovies[movie.id]) {
          delete favoriteMovies[movie.id];
        } else {
          favoriteMovies[movie.id] = movie;
        }
  
        return {
          ...state,
          favoriteMovies
        };
      }

    case 'EDIT_MOVIE':
      {
        const movieId = action.data.movieId;
        if (state.favoriteMovies[movieId]) {
          const favoriteMovies = { ...state.favoriteMovies };
          const movie = { ...favoriteMovies[movieId], ...action.data.newData };
          favoriteMovies[movieId] = movie;
          
          return {
            ...state,
            favoriteMovies
          };
        }
      }

    default:
      return state;
  }
};
