import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WpApiPosts } from 'wp-api-angular'
import { Observable } from 'rxjs';

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

  posts$: Observable<Array<any>>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wpApiPosts: WpApiPosts) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
    this.posts$ = this.wpApiPosts.getList()
      .map((r) => r.json());
  }

}
