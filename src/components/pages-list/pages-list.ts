import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppearIn } from './../../utils/animations';

/*
  Generated class for the PagesList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pages-list',
  templateUrl: 'pages-list.html',
  animations: [AppearIn]
})
export class PagesListComponent {
  type: string;
  params: any;
  list: Array<any>;

  constructor() {
  }

  openPage = (e, page) => {
    // this.navCtrl.push(PostPage, {
    //   id: page.id
    // })
  }

  trackById = (index: number, item) => item.id;
}
