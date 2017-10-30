import { Observable } from 'rxjs';
import { Component, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';
import _isObject from 'lodash/isObject';

import { ListParent, IListPage, IListResult } from '../abstract/ListParent';
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
export class ListPage extends ListParent implements IListPage {
  title: string;

  constructor(
    public inject: Injector,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiCustom: WpApiCustom,
  ) {
    super(inject);
  }

  ionViewDidLoad() {
    this.title = this.getTitle();

    this.setStoreStream(this.store.select(state => state.list[this.getUniqueStoreKey()]));
    this.setIsLoadingStream(this.store.select(state => _get(state, `list[${this.getUniqueStoreKey()}].submitting`)));
    this.setShowSpinnerStream(Observable.combineLatest(
      this.store$,
      this.isLoading$,
      (listState: any, isLoading: boolean) =>
        isLoading && !_get(listState, 'list', []).length
    ));
    this.setStream(Observable.combineLatest(
      this.store$,
      this.store.select(state => state.items[this.type]),
      this.itemsToDisplay$,
      (listState: any, item = {}, itemsToDisplay) =>
        _take(_get(listState, 'list', []), itemsToDisplay).map(id => item[id])));
    this.setService(this.wpApiCustom.getInstance(this.type));
    this.doInit();
  }

  doInit(): void {
    let currentList = this.getCurrentList();
    if (!currentList.length) {
      this.doLoad();
    } else {
      this.updateItemsToDisplay(true);
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
