import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { parseMovieData } from '../../helpers/movie-parser.helper';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Movie } from '../../../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {

  public YEAR_FORMAT = 'yyyy';
  public userRating: number;
  public userReview: string;

  private _movie: Movie = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog) {
  }

  @Output() submit: EventEmitter<any> = new EventEmitter();

  @Input()
  set movie(value: Movie) {
    this._movie = parseMovieData(value);
    this.userRating = this._movie.userRating;
    this.userReview = this._movie.userReview;
  }

  get movie(): Movie {
    return this._movie;
  }

  ngOnInit() {
    this.movie = this.data;
  }

  public handleClose(): void {
    this.dialog.closeAll();
  }

  /**
   * Emits to the parent the editable data
   */
  public handleSubmit(): void {
    this.submit.emit({ userRating: this.userRating, userReview: this.userReview });
  }
}
