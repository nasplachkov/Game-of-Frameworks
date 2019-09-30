import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, of, Subscription } from 'rxjs';

import { MoviesService } from '../../services/movies.service';
import { AppState } from '../../../../reducers';
import { getFavorites, getIsFavorites, getSearchResults } from '../../store/movies.selector';
import { AddRemoveFromFavorites, ToggleFavorites, UpdateFavoriteMovie } from '../../store/movies.actions';
import { catchError, switchMap, take } from 'rxjs/internal/operators';
import { TrailerComponent } from '../trailer/trailer.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Movie } from '../../../../models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html'
})
export class MoviesListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public emptyListMessage = {
    favorites: 'You have no favorite movies yet. Use the search on the top-right.',
    search: 'There are no results for your search'
  };

  public movies: Observable<Movie[]> = null;
  public isFavorites: boolean;
  private search: string = '';
  public favoriteMovies: Observable<any> = of([]);
  public searchResults: Observable<any> = of([]);

  constructor(
    private store: Store<AppState>,
    private moviesService: MoviesService,
    private dialog: MatDialog) {
    // always holds an observable to the favorites
    this.favoriteMovies = this.store.pipe(
      select(getFavorites)
    );
    // always holds an observable to the search results
    this.searchResults = this.store.pipe(
      select(getSearchResults)
    );

    // subscribe to the viewMode - favorites or search
    this.subscription.add(
      this.store.pipe(
        select(getIsFavorites)
      ).subscribe(isFavorites => {
          this.handleIsFavorites(isFavorites);
        }
      )
    );
  }

  /**
   * Initializes the component
   * Queries the initially needed data - favorite movies and genres
   * Subscribes to
   */
  ngOnInit() {
    this.moviesService.getFavorites();
    this.moviesService.getGenres();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Handle the change of the view mode
   * @param {boolean} isFavorites
   */
  private handleIsFavorites(isFavorites: boolean) {
    this.isFavorites = isFavorites;
    if (this.isFavorites) {
      this.movies = this.favoriteMovies.pipe(
        // Converts the favorites object to an array
        switchMap(favorites => of(Object.values(favorites || {}) as Movie[]))
      );
    } else {
      this.movies = this.searchResults;
    }
  }

  /**
   * Saves localy the search.
   * If the view mode is favorites and the user types in
   * the search - changes it to search mode.
   *
   * @param {string} search
   */
  public queryMovies(search: string) {
    this.search = search;
    this.moviesService.search(this.search);
  }

  /**
   * Dispatches action to change the view mode
   */
  public toggleIsOnlyFavorites() {
    this.store.dispatch(new ToggleFavorites());
  }

  /**
   * Handles change in the isFavorite prop of a film.
   * Makes a request to either add or remove it from the
   * favorite list.
   * @param movie
   */
  public handleFavorite(movie) {
    this.subscription.add(
      this.store.pipe(
        select(getFavorites),
        take(1),
        switchMap(favorites => {
          const isFavorite = favorites[movie.id];
          return isFavorite ? this.moviesService.removeFromFavorites(movie) : this.moviesService.addToFavorites(movie);
        })
      ).subscribe(response => {
          //  success toggle favorites
          this.store.dispatch(new AddRemoveFromFavorites(movie));
        }, err => console.error(err)
      )
    );
  }

  /**
   * Makes a request for the movie trailer and opens a popup with it.
   * If there isn't a trailer - opens an alert
   * @param movie
   */
  public openTrailer(movie) {

    this.subscription.add(this.moviesService.getMovieTrailers(movie.id).subscribe(response => {

      const youtubeId = response && response.results && response.results[0] && response.results[0].key;

      if (youtubeId) {
        this.dialog.open(TrailerComponent, {
          panelClass: 'gof-trailer',
          data: { youtubeId },
        });
      } else {
        this.dialog.open(AlertComponent, {
          panelClass: 'gof-alert-container',
          position: { top: '50px' }
        });
      }

    }));
  }

  /**
   * Opens a detail popup of a movie and handles the submit action.
   * @param movie
   */
  public openDetail(movie) {
    const dialogRef = this.dialog.open(MovieDetailComponent, {
      panelClass: 'gof-movie-detail',
      data: movie
    });

    this.subscription.add(dialogRef.componentInstance.submit.subscribe(data => {
      // make a request to update the user editable data
      this.subscription.add(this.moviesService.editFavoriteMovie(movie, data).subscribe(response => {

        const updatedFavorite = {
          ...movie,
          ...data
        };

        this.store.dispatch(new UpdateFavoriteMovie(updatedFavorite));

        dialogRef.close();
      }));
    }));
  }
}
