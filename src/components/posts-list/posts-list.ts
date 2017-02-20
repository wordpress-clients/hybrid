import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppearIn } from './../../utils/animations';

/*
  Generated class for the PostsList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'posts-list',
  templateUrl: 'posts-list.html',
  animations: [AppearIn]
})
export class PostsListComponent {
  type: string;
  params: any;
  list: Array<any>;

  constructor(
    private navCtrl: NavController,
  ) {
  }

  openPage = (e, post) => {
    // this.navCtrl.push(PostPage, {
    //   id: post.id
    // })
  }

  trackById = (index: number, item) => item.id;
}
