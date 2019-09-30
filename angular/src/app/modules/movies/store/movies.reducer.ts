import { MoviesActions, MoviesActionTypes } from './movies.actions';

export const MOVIES_STATE_KEY = 'movies';

export interface MoviesStateModel {
  searchResults: any[]
  favorites: any[],
  genres: any[],
  onlyFavorites: boolean
}

export const authInitialState = {
  searchResults: [],
  favorites: [],
  genres: null,
  onlyFavorites: true
};

export function moviesReducer(state = authInitialState, action: MoviesActions): MoviesStateModel {
  switch (action.type) {
    case MoviesActionTypes.SaveFavoritesList:
      return { ...state, favorites: action.payload || [] };
    case MoviesActionTypes.SaveGenresList:
      return { ...state, genres: action.payload };
    case MoviesActionTypes.ToggleFavorites:
      return { ...state, onlyFavorites: !state.onlyFavorites };
    case MoviesActionTypes.SaveSearchResult:
      // merge the results, to be able to show the extra data stored in favorites - userReview, userRating
      const mergedResult = action.payload.map(searchResult => {
        return {
          ...searchResult,
          ...state.favorites[searchResult.id]
        }
      });

      return {
        ...state,
        searchResults: mergedResult,
        onlyFavorites: false
      };
    case MoviesActionTypes.AddRemoveFromFavorites:

      const isFavorite = state.favorites[action.payload.id];

      const updatedFavorites = { ...state.favorites };
      if (isFavorite) {
        delete updatedFavorites[action.payload.id];
      } else {
        updatedFavorites[action.payload.id] = action.payload;
      }

      const updatedSearchResults = [...state.searchResults];

      const indexInSearchResults = state.searchResults.findIndex(movie => movie.id === action.payload.id);

      if (indexInSearchResults !== -1 && isFavorite) {
        updatedSearchResults[indexInSearchResults] = {
          ...updatedSearchResults[indexInSearchResults],
          userRating: 0,
          userReview: ''
        };
      }

      return {
        ...state,
        favorites: updatedFavorites,
        searchResults: updatedSearchResults
      };
    case MoviesActionTypes.UpdateFavoriteMovie:

      const updatedFavs = {
        ...state.favorites,
      };

      const updatedSearchResult = [...state.searchResults];


      updatedFavs[action.payload.id] = action.payload;

      const indexInSearchRes = state.searchResults.findIndex(movie => movie.id === action.payload.id);

      if (indexInSearchRes !== -1) {
        const updatedMovie = { ...updatedSearchResult[indexInSearchRes] };
        updatedMovie.userRating = action.payload.userRating;
        updatedMovie.userReview = action.payload.userReview;
        updatedSearchResult[indexInSearchRes] = updatedMovie;
      }

      return {
        ...state,
        favorites: updatedFavs,
        searchResults: updatedSearchResult
      }
  }
  return state;
};
