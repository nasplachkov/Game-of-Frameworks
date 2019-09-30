import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { parseMovieData } from '../../helpers/movie-parser.helper';
import { Movie } from '../../../../models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html'
})
export class MovieItemComponent {


  @Output() public onFavoriteChange: EventEmitter<any> = new EventEmitter();
  @Output() public openTrailer: EventEmitter<any> = new EventEmitter();
  @Output() public openDetail: EventEmitter<any> = new EventEmitter();

  @Input() public isFavorite: boolean = false;

  public contextMenuOpened = false;
  private _movie: Movie = null;

  @Input()
  set movie(value: Movie) {
    this._movie = parseMovieData(value);
  }

  get movie(): Movie {
    return this._movie;
  }

  /**
   * Emits to parent add/remove from favorites
   */
  public handleFavorite(): void {
    this.onFavoriteChange.emit(this.movie);
  }

  /**
   * Emits to parent, to open the trailer
   */
  public handleTrailer(): void {
    this.openTrailer.emit()
  }

  /**
   * Emits to parent to open the detail view
   */
  public openDetailModal() {
    this.contextMenuOpened = false;
    this.openDetail.emit();
  }
}
