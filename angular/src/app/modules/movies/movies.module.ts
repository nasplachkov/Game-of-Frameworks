import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MOVIES_STATE_KEY, moviesReducer } from './store/movies.reducer';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { GenreListPipe } from './pipes/genre-list.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { TrailerComponent } from './components/trailer/trailer.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RatingInputComponent } from './components/rating-input/rating-input.component';
import { StarComponent } from './components/star/star.component';

@NgModule({
  declarations: [
    MoviesListComponent,
    MovieItemComponent,
    GenreListPipe,
    HeaderComponent,
    TrailerComponent,
    MovieDetailComponent,
    RatingInputComponent,
    StarComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    StoreModule.forFeature(MOVIES_STATE_KEY, moviesReducer),
  ],
  providers: [],
  exports: [MoviesListComponent],
  entryComponents: [
    TrailerComponent,
    MovieDetailComponent
  ]
})
export class MoviesModule {}
