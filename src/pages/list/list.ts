import { Observable } from 'rxjs';
import { Component, Injector, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';
import _isObject from 'lodash/isObject';

import { ListParent, IListResult } from '../abstract/ListParent';
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
export class ListPage extends ListParent {
  title: string;
  @ViewChild(Content) content: Content;

  constructor(
    public inject: Injector,
    public navCtrl: NavController,
    public store: Store<AppState>,
    public wpApiCustom: WpApiCustom,
  ) {
    super(inject);
  }

  ionViewDidLoad() {
    this.title = this.getTitle();
    this.setStoreStream(this.store.select(state => state.list[this.getUniqueStoreKey()]));
    this.setIsLoadingStream(this.store.select(state => _get(state, `list[${this.getUniqueStoreKey()}].submitting`)));
    this.setHasErrorStream(this.store.select(state => _get(state, `list[${this.getUniqueStoreKey()}].error`)));
    this.setItemsToDisplayStream(Observable.combineLatest(
      this.currentPage$,
      this.store.select(state => _get(state, `list[${this.getUniqueStoreKey()}].perPage`)),
      (currentPage: number, perPage: number) => currentPage * perPage
    ));
    this.setShowSpinnerStream(Observable.combineLatest(
      this.store$,
      this.isLoading$,
      (listState: any, isLoading: boolean) =>
        isLoading && !_get(listState, 'list', []).length
    ));
    this.setIsPaginationEnableStream(Observable.combineLatest(
      this.hasError$,
      this.currentPage$,
      this.store.select(state => _get(state, `list[${this.getUniqueStoreKey()}].totalPages`)),
      (hasError: boolean, currentPage: number, totalPages: number) => !hasError && currentPage <= totalPages
    ))
    this.setStream(Observable.combineLatest(
      this.store$,
      this.store.select(state => state.items[this.type]),
      this.itemsToDisplay$,
      (listState: any, item = {}, itemsToDisplay) =>
        _take(_get(listState, 'list', []), itemsToDisplay).map(id => item[id])));
    this.doLoad();
  }

  getTitle() {
    return this.translate.instant(`TITLE_${this.type}`.toUpperCase());
  }
}
