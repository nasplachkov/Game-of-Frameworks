import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/index';

import { AppState } from '../../../reducers';
import { getAllGenres } from '../store/movies.selector';

@Pipe({
  name: 'genreList'
})
export class GenreListPipe implements PipeTransform, OnDestroy {

  private genreList = null;
  private sub: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {
    this.sub.add(this.store.pipe(select(getAllGenres)).subscribe(genreList => {
      this.genreList = genreList;
    }))
  }

  /**
   * Maps the genre ids to a string
   * @param {any[]} ids
   * @returns {string}
   */
  transform(ids: any[]): string {
    if (!this.genreList || !ids || !Array.isArray(ids)) {
      return 'N/A';
    }
    return ids
      .map(id => this.genreList[id] ? this.genreList[id].name : null)
      .filter(genre => genre)
      .join(', ');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
