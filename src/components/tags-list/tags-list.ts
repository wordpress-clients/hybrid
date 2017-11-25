import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppearIn } from './../../utils/animations';
import { IListComponent } from './../interfaces';
import { ListParentComponent } from './../ListParent';
import { ListTagPage } from './../../pages/list/list-tag';

/*
  Generated class for the TagsList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'tags-list',
  templateUrl: 'tags-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [AppearIn],
})
export class TagsListComponent extends ListParentComponent implements IListComponent {

  constructor(
    public navCtrl: NavController,
    public cdRef: ChangeDetectorRef,
  ) {
    super(navCtrl, cdRef);
  }

  openPage = (e, item) => {
    this.navCtrl.push(ListTagPage, {
      type: 'posts',
      id: item.id,
    })
  }
}
