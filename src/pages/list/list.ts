import { Observable } from 'rxjs';
import {
  Component, Injector,
  ComponentFactoryResolver
} from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';
import _isObject from 'lodash/isObject';

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
  title: string;

  constructor(
    public inject: Injector,
    public componentFactoryResolver: ComponentFactoryResolver,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiCustom: WpApiCustom,
  ) {
    super(inject);
  }

  ionViewDidLoad() {
    this.title = this.getTitle();

    this.setStore(this.store.select(state => state.list[this.type + JSON.stringify(this.getQuery())]));

    this.setStream(
      Observable.combineLatest(
        this.store$,
        this.store.select(state => state.items[this.type]),
        this.itemsToDisplay$,
        (listState: any, item = {}, itemsToDisplay) => {
          return _take(_get(listState, 'list', []), itemsToDisplay).map(id => item[id])
        }))

    this.setService(this.wpApiCustom.getInstance(this.type))
    super.ionViewDidLoad();
  }

  doInit(): void {
    super.doInit();

    let currentList = this.getCurrentList();
    if (!currentList.length) {
      this.fetch().first().subscribe();
    } else {
      this.init = true;
      this.updateItemsToDisplay();
    }
  }

  onLoad({ page, totalPages, totalItems, list }: IListResult) {
    this.store.dispatch(addList(this.type, this.getQuery(), {
      page,
      totalPages,
      totalItems,
      list
    }));
  }

  onClean() {
    this.store.dispatch(cleanList(this.type));
  }

  getTitle() {
    return this.translate.instant(`TITLE_${this.type}`.toUpperCase());
  }
}
