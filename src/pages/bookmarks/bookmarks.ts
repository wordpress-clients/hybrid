import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { removeBookmark } from '../../actions';
import { AppState, IPostsState, IPagesState } from '../../reducers';
import { Config, Toast } from './../../providers';
import { MenuMapping } from '../../pages';

/*
  Generated class for the Bookmarks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html'
})
export class BookmarksPage {
  page = 0;
  stream$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>
  ) {
    this.stream$ = this.store.select('bookmarks')
      .combineLatest(
      this.store.select('page'),
      this.store.select('post'),
      (bookmarks, pages: IPagesState, posts: IPostsState) => {
        const list = [];
        console.log('[BookmarksPage] observable rerun')
        Object.keys(bookmarks).forEach((bookmarkUid) => {
          const bookmark = bookmarks[bookmarkUid];
          switch (bookmark.type) {
            case 'page':
              bookmark.item = pages[bookmark.id];
              break;
            case 'post':
              bookmark.item = posts[bookmark.id];
              break;
          };
          list.push(bookmark);
        });
        return list;
      });
  }

  ionViewDidLoad() {
    console.log('[BookmarksPage] ionViewDidLoad');
  }

  doOpen = (e, item) => {
    this.navCtrl.push(MenuMapping[item.type], {
      id: item.id
    })
  };

  doRemove = (e, item) => this.store.dispatch(removeBookmark(`${item.type}:${item.id}`));
}
