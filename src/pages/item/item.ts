import { Component, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpApiPages, WpApiPosts, WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';

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
  wpApiCustom: WpApiCustom;
  constructor(
    public injector: Injector,
    private store: Store<AppState>,
  ) {
    super(injector);
  }

  ionViewDidLoad() {
    this.setStream((<any>this.injector.get(Store)).select(state => {
      if (this.navParams.get('id')) {
        return _get(state, `items[${this.type}][${this.navParams.get('id')}]`)
      } else if (this.navParams.get('slug')) {
        const itemId = _get(state, `itemsSlugMapping[${this.type}][${this.navParams.get('slug')}]`)
        return _get(state, `items[${this.type}][${itemId}]`)
      } else {
        throw new Error('No way to determine ID or Slug of the item')
      }
    }));
    // const type = this.navParams.get('type')
    // type && this.setType(type);
    console.log('item.type here', this.type)

    this.setService(this.injector.get(WpApiCustom).getInstance(this.type));
    super.ionViewDidLoad()
  }

  onLoad(item) {
    this.store.dispatch(addItem(this.type, Array.isArray(item) ? item[0] : item));
  }
}
