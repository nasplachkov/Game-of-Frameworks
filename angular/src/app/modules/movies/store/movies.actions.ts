import { Action } from '@ngrx/store';

export enum MoviesActionTypes {
  SaveFavoritesList = '[Movies] Save favorites',
  SaveGenresList = '[Movies] Save genres',
  ToggleFavorites = '[Movies] Toggle favorites',
  SaveSearchResult = '[Movies] Save search result',
  AddRemoveFromFavorites = '[Movies] Add remove from favorites',
  UpdateFavoriteMovie = '[Movies] Update favorite movie'
}

export class SaveFavorites implements Action {
  public readonly type = MoviesActionTypes.SaveFavoritesList;

  constructor(public readonly payload: any) {
  }
}

export class SaveGenresList implements Action {
  public readonly type = MoviesActionTypes.SaveGenresList;

  constructor(public readonly payload: any) {
  }
}

export class ToggleFavorites implements Action {
  public readonly type = MoviesActionTypes.ToggleFavorites;
}

export class SaveSearchResult implements Action {
  public readonly type = MoviesActionTypes.SaveSearchResult;

  constructor(public readonly payload: any) {
  }
}

export class AddRemoveFromFavorites implements Action {
  public readonly type = MoviesActionTypes.AddRemoveFromFavorites;

  constructor(public readonly payload: any) {
  }
}

export class UpdateFavoriteMovie implements Action {
  public readonly type = MoviesActionTypes.UpdateFavoriteMovie;

  constructor(public readonly payload: any) {
  }
}

export type MoviesActions =
  SaveFavorites |
  SaveGenresList |
  ToggleFavorites |
  SaveSearchResult |
  AddRemoveFromFavorites |
  UpdateFavoriteMovie;
