import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs/index';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private SEARCH_DEBOUNCE_TIME = 400;

  private sub: Subscription;

  public searchChangedSubject: Subject<string> = new Subject<string>();

  @Output() public searchChanged: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    // debounce the search and emit to parent
    this.sub = this.searchChangedSubject.pipe(
      debounceTime(this.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged()).subscribe(search => {
      this.searchChanged.emit(search);
    });
  }

  ngOnDestroy() {
    //unsubscribe to prevent memory leaks
    this.sub && this.sub.unsubscribe();
  }


}
