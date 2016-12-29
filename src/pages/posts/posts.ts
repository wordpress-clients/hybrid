import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WpApiPosts } from 'wp-api-angular'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { addPosts } from '../../actions';
import { AppState } from '../../reducers';

/*
  Generated class for the Posts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {

  page: number = 1;
  posts$: Observable<Object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wpApiPosts: WpApiPosts,
    private store: Store<AppState>
  ) {
    this.posts$ = store.select('posts');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

  getPosts() {
    return this.wpApiPosts.getList()
      .toPromise()
      .then((r) => {
        this.store.dispatch(addPosts({
          totalPages: parseInt(r.headers.get('x-wp-totalpages')),
          totalItems: parseInt(r.headers.get('x-wp-total')),
          list: r.json()
        }));
      });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation', infiniteScroll);
    this.getPosts();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

}
