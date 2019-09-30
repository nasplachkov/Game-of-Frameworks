import { MOVIES_STATE_KEY } from './movies.reducer';

export const getAllGenres = state => state[MOVIES_STATE_KEY].genres;
export const getIsFavorites = state => state[MOVIES_STATE_KEY].onlyFavorites;
export const getFavorites = state => state[MOVIES_STATE_KEY].favorites;
export const getSearchResults = state => state[MOVIES_STATE_KEY].searchResults;
