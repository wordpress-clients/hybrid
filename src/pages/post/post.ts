import { WpApiPosts } from 'wp-api-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { addPost } from '../../actions';
import { AppState } from '../../reducers';

/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  post$: Observable<Object>;
  postSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wpApiPosts: WpApiPosts,
    private store: Store<AppState>
  ) {
    this.post$ = this.store.select((state) => state.post[this.navParams.get('id')]);
  }

  ionViewDidLoad() {
    let isPostLoaded;
    this.post$.take(1).subscribe(post => isPostLoaded = post !== undefined);
    if (!isPostLoaded) {
      console.log('post not loaded!');
      this.wpApiPosts.get(this.navParams.get('id'), {
        "search": `_embed=true`
      })
        .retry(3)
        .map(r => {
          this.store.dispatch(addPost(r.json()));
          
        })
        .catch(res => {
          console.log("ERROR! " + res);
          return res;
        }).subscribe();
    }
  }

}
