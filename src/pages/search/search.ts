import { Observable, Subject, Subscription } from 'rxjs';
import {
  Component, Injector,
  ComponentFactoryResolver, ViewChild
} from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';
import _isObject from 'lodash/isObject';
import _throttle from 'lodash/throttle';

import { ListParent, IListResult, IListPage } from '../abstract/ListParent';
import { actions } from '../../reducers/search';
import { Config } from './../../providers';
import { AppState } from '../../reducers';
import { getKey } from '../../reducers/search';
import { IAPIError } from '../../APIInterfaces';
import { MenuMapping } from '../../../config/pages/';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage extends ListParent implements IListPage {
  @ViewChild(Content) content: Content;
  types: string[];
  searchTerm: string;
  searchTermSubject = new Subject<string>();
  typeSubject = new Subject<string>();
  fetchSubscription: Subscription;

  constructor(
    public inject: Injector,
    public componentFactoryResolver: ComponentFactoryResolver,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiCustom: WpApiCustom,
    public config: Config,
  ) {
    super(inject);
    this.types = this.config.getSearch('types', ['posts']);

    this.setType(this.types[0]);
    this.setStoreStream(this.store.select(state => state.search[`${getKey(this.type, this.searchTerm)}`]));
    this.setIsLoadingStream(this.store.select(state => _get(state, `search[${getKey(this.type, this.searchTerm)}].submitting`)));
    this.setShowSpinnerStream(Observable.combineLatest(
      this.searchTermSubject,
      this.store$,
      this.isLoading$,
      (searchTerm: string, listState: any, isLoading: boolean = false) =>
        searchTerm !== '' && isLoading && !_get(listState, 'list', []).length
    ));
    this.setService(this.wpApiCustom.getInstance(this.type));

    this.fetchSubscription = Observable.combineLatest(
      this.searchTermSubject,
      this.typeSubject,
      (searchTerm: string, type: string) => {
        this.setType(type);
        this.setService(this.wpApiCustom.getInstance(type));
        this.setStoreStream(this.store.select(state => state.search[getKey(type, searchTerm)]));
      })
      .debounceTime(300) // wait 300ms after each keystroke before considering the term
      .switchMap(() => this.doInit())
      .subscribe(() => { })

    this.setStream(
      Observable.combineLatest(
        this.searchTermSubject,
        this.typeSubject,
        this.store.select(state => state.search),
        this.store.select(state => state.items),
        this.itemsToDisplay$,
        (searchTerm: string, type: string, searchState, items = {}, itemsToDisplay) => {
          const item = items[type]
          return _take(_get(searchState, `[${getKey(type, searchTerm)}].list`, []), itemsToDisplay).map(id => item[id])
        })
    )
  }

  doInit(): Observable<any> {
    this.enablePagination();
    const currentList = this.getCurrentList();
    if (!currentList.length && this.searchTerm) {
      return this.fetch$();
    } else {
      this.updateItemsToDisplay();
      return Observable.of<any>([]);
    }
  }

  getQuery() {
    const query = super.getQuery();
    return Object.assign({}, query, {
      search: this.searchTerm
    });
  }

  search(e) {
    this.searchTerm = e.target.value || '';
    this.searchTermSubject.next(this.searchTerm);
  }

  scrollToTop = () => _throttle(this.content.scrollToTop, 500, { leading: true, trailing: false })

  onTypeChange(e) {
    this.typeSubject.next(this.type);
    this.updateItemsToDisplay(true);
    this.scrollToTop();
  }

  ionViewDidLoad() {
    this.searchTermSubject.next("");
    this.typeSubject.next(this.type);
    this.doInit();
  }

  ionViewWillUnload() {
    this.fetchSubscription.unsubscribe();
  }

  onRequest(reset: boolean) {
    this.store.dispatch(actions.request(this.searchTerm, this.type, this.getQuery(), reset));
  }

  onSuccess({ page, totalPages, totalItems, list }: IListResult, reset: boolean) {
    this.store.dispatch(actions.success(this.searchTerm, this.type, this.getQuery(), {
      page,
      totalPages,
      totalItems,
      list
    }, reset));
  }

  onError() {
    this.store.dispatch(actions.error(this.searchTerm, this.type, this.getQuery()));
  }
}
