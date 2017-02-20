import { Observable } from 'rxjs';
import {
  Component, Injector,
  ComponentFactoryResolver
} from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpApiPages, WpApiPosts, WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';

import { AbstractListPage, IListPage, IListResult } from '../abstract/PaginatedPage';
import { addList, cleanList } from '../../actions';
import { AppState } from '../../reducers';

/*
  Generated class for the Pages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage extends AbstractListPage implements IListPage {

  constructor(
    public inject: Injector,
    public componentFactoryResolver: ComponentFactoryResolver,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiPages: WpApiPages,
    private wpApiPosts: WpApiPosts,
    private wpApiCustom: WpApiCustom,
  ) {
    super(inject);
    this.setType(this.navParams.get('type'));
    this.setParams(JSON.parse(this.navParams.get('params') || "{}"));

    this.setStream(
      Observable.combineLatest(
        this.store.select(state => state.list && state.list[this.type]),
        this.store.select(state => state.items && state.items[this.type]),
        (listState: any, item = {}) => {
          console.log('list', listState, item)
          return _get(listState, 'list', []).map(id => item[id])
        }))

    this.setStore(store.select(state => state.list && state.list[this.type]));

    if (this.type === 'pages') this.setService(wpApiPages)
    else if (this.type === 'posts') this.setService(wpApiPosts)
    else this.setService(wpApiCustom.getInstance(this.type))

  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
  }

  onLoad({ page, totalPages, totalItems, list }: IListResult) {
    this.store.dispatch(addList(this.type, {
      page,
      totalPages,
      totalItems,
      list
    }));
  }

  onClean() {
    this.store.dispatch(cleanList(this.type));
  }

  openPage = (e, page) => {
    // this.navCtrl.push(PagePage, {
    //   id: page.id
    // })
  }

}
