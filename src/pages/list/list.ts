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
import { actions } from '../../reducers/list';
import { AppState } from '../../reducers';
import { IAPIError } from '../../APIInterfaces';

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

    this.setStore(this.store.select(state => state.list[this.getUniqueStoreKey()]));
    this.setLoading(this.store.select(state => {
      const loading = _get(state, `list[${this.getUniqueStoreKey()}].submitting`);
      const hasData = _get(state, `list[${this.getUniqueStoreKey()}].list`, []).length;
      return loading && !hasData;
    }));

    this.setStream(Observable.combineLatest(
      this.store$,
      this.store.select(state => state.items[this.type]),
      this.itemsToDisplay$,
      (listState: any, item = {}, itemsToDisplay) => {
        console.log('aaa', listState, item, itemsToDisplay)
        return _take(_get(listState, 'list', []), itemsToDisplay).map(id => item[id])
      }));

    this.setService(this.wpApiCustom.getInstance(this.type));
    super.ionViewDidLoad();
  }

  doInit(): void {
    super.doInit();

    let currentList = this.getCurrentList();
    if (!currentList.length) {
      this.fetch$().first().subscribe();
    } else {
      this.updateItemsToDisplay();
    }
  }

  onRequest(reset: boolean) {
    this.store.dispatch(actions.request(this.type, this.getQuery(), reset));
  }

  onSuccess({ page, totalPages, totalItems, list }: IListResult, reset: boolean) {
    this.store.dispatch(actions.success(this.type, this.getQuery(), {
      page,
      totalPages,
      totalItems,
      list
    }, reset));
  }

  onError(error: IAPIError) {
    this.store.dispatch(actions.error(this.type, this.getQuery(), error));
  }

  getTitle() {
    return this.translate.instant(`TITLE_${this.type}`.toUpperCase());
  }
}
