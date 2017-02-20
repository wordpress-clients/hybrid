import { WpApiPages } from 'wp-api-angular';
import { Component, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { addItem } from '../../actions';
import { AppState } from '../../reducers';
import { AbstractItemPage } from './../abstract/ItemPage';

/*
  Generated class for the Item page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage extends AbstractItemPage {
  constructor(
    public injector: Injector,
    public navCtrl: NavController,
    private wpApiPages: WpApiPages,
    private store: Store<AppState>
  ) {
    super(injector);
    this.setType(this.navParams.get('type'));
    this.setStream(this.store.select(state => state.items && state.items[this.type]));
    this.setService(wpApiPages);
  }

  onLoad(item) {
    this.store.dispatch(addItem(this.type, item));
  }
}
