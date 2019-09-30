import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { catchError, switchMap, take } from 'rxjs/internal/operators';
import { of } from 'rxjs/index';

import { HttpService } from '../../shared/services/http.service';
import { apiRequests } from '../../../constants';
import { AppState } from '../../../reducers';
import { userSelector } from '../../authentication';
import { SaveFavorites, SaveGenresList, SaveSearchResult } from '../store/movies.actions';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpService: HttpService,
    private store: Store<AppState>) {
  }

  /**
   *
   * @param {string} title
   * @param {number} page
   * @returns {Observable<any>}
   */
  public search(title: string, page = 1) {
    return this.httpService.get(apiRequests.movies.search, { query: title, page }).pipe(
      take(1)).subscribe(response => {
      if (response && response.results) {
        this.store.dispatch(new SaveSearchResult(response.results));
      }
    }, err => console.error(err));
  }

  /**
   *
   * @returns {Observable<any>}
   */
  public getGenres() {
    return this.httpService.get(apiRequests.movies.getGenres).pipe(take(1))
      .subscribe(response => {
        const genres = {};
        response.genres.forEach(genre => genres[genre.id] = genre);
        this.store.dispatch(new SaveGenresList(genres));
      }, err => console.error(err));
  }

  /**
   *
   * @param {string} movieId
   * @returns {Observable<any>}
   */
  public getMovieTrailers(movieId: string) {
    return this.httpService.get(apiRequests.movies.getMovieTrailers(movieId)).pipe(take(1));
  }

  /**
   *
   * @returns {Subscription}
   */
  public getFavorites() {
    return this.store.pipe(take(1), select(userSelector), switchMap((user: any) => {
      return this.httpService.get(apiRequests.movies.favorites(user.localId))
    })).subscribe((response: any) => {
      this.store.dispatch(new SaveFavorites(response));
    }, (err) => console.error(err));
  }

  /**
   *
   * @param movie
   * @returns {Observable<any>}
   */
  public addToFavorites(movie) {
    return this.store.pipe(take(1), select(userSelector), switchMap((user: any) => {
      return this.httpService.put(apiRequests.movies.favoriteMovie(user.localId, movie), movie);
    }), catchError(err => of(console.error(err))));
  }

  /**
   *
   * @param movie
   * @returns {Observable<any>}
   */
  public removeFromFavorites(movie) {
    return this.store.pipe(take(1), select(userSelector), switchMap((user: any) => {
      return this.httpService.delete(apiRequests.movies.favoriteMovie(user.localId, movie));
    }), catchError(err => of(console.error(err))));
  }

  /**
   *
   * @param movie
   * @param editedData
   * @returns {Observable<any>}
   */
  public editFavoriteMovie(movie, editedData) {
    return this.store.pipe(take(1), select(userSelector), switchMap((user: any) => {
      return this.httpService.patch(apiRequests.movies.favoriteMovie(user.localId, movie), editedData);
    }), catchError(err => of(console.error(err))));
  }
}
