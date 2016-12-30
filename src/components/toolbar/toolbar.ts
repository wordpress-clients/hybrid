import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { addBookmark, removeBookmark } from '../../actions';
import { AppState } from '../../reducers';

/*
  Generated class for the Toolbar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html'
})
export class ToolbarComponent {
  @Input() categories: Array<Object>;
  @Input() tags: Array<Object>;
  @Input() bookmarkId: String;

  isBookmarked$: Observable<Boolean>;

  constructor(
    private store: Store<AppState>
  ) {
    this.isBookmarked$ = this.store.select((state: AppState) => {
      console.log('state.bookmarks', state.bookmarks);
      return state.bookmarks.indexOf(this.bookmarkId) > -1;
    });
  }

  doBookmark(e) {
    let isBookmarked;
    this.isBookmarked$.take(1).subscribe(response => isBookmarked = response);

    if (isBookmarked) {
      this.store.dispatch(removeBookmark(this.bookmarkId));
    } else {
      this.store.dispatch(addBookmark(this.bookmarkId));
    }
  }

}
