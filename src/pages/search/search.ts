import { Observable, Subject, Subscription } from 'rxjs';
import {
  Component, Injector,
  ComponentFactoryResolver, ViewChild
} from '@angular/core';
import { Content } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';
import _throttle from 'lodash/throttle';
import debug from 'debug';

import { ListParent } from '../abstract/ListParent';
import { Config } from './../../providers';
import { AppState } from '../../reducers';
import { getKey, actions, ISearchState } from '../../reducers/search';

const log = debug('Search');

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage extends ListParent {
  @ViewChild(Content) content: Content;
  types: string[];
  searchTerm: string;
  searchTermSubject = new BehaviorSubject<string>('');
  typeSubject = new Subject<string>();
  fetchSubscription: Subscription;

  constructor(
    public inject: Injector,
    public componentFactoryResolver: ComponentFactoryResolver,
    public store: Store<AppState>,
    public config: Config,
  ) {
    super(inject);
    this.types = this.config.getSearch('types', ['posts']);

    this.setType(this.types[0]);
    this.setStoreStream(this.store.select(state => state.search[`${getKey(this.type, '')}`]));

    this.fetchSubscription = Observable.combineLatest(
      this.searchTermSubject,
      this.typeSubject,
      (searchTerm: string, type: string) => {
        this.setType(type);
        this.setStoreStream(this.store.select(state => state.search[`${getKey(this.type, searchTerm)}`]));
      })
      .debounceTime(300) // wait 300ms after each keystroke before considering the term
      .map(() => this.doLoad())
      .subscribe(() => { });

    this.setHasErrorStream(Observable.combineLatest(
      this.searchTermSubject,
      this.typeSubject,
      this.store.select(state => state.search),
      (searchTerm: string, type: string, searchState: ISearchState) => {
        return _get(searchState, `[${getKey(type, searchTerm)}].error`, false);
      }
    ));
    this.setIsLoadingStream(Observable.combineLatest(
      this.searchTermSubject,
      this.typeSubject,
      this.store.select(state => state.search),
      (searchTerm: string, type: string, searchState: ISearchState) => {
        return _get(searchState, `[${getKey(type, searchTerm)}].submitting`, false);
      }
    ));
    this.setIsPaginationEnableStream(Observable.combineLatest(
      this.searchTermSubject,
      this.typeSubject,
      this.hasError$,
      this.currentPage$,
      this.store.select(state => state.search),
      (searchTerm: string, type: string, hasError: boolean, currentPage: number, searchState: ISearchState) => {
        const totalPages = _get(searchState, `[${getKey(type, searchTerm)}].totalPages`, 0)
        return !hasError && currentPage <= totalPages;
      }
    ));
    this.setShowSpinnerStream(Observable.combineLatest(
      this.searchTermSubject,
      this.store$,
      this.isLoading$,
      (searchTerm: string, listState: any, isLoading: boolean = false) =>
        searchTerm !== '' && isLoading && !_get(listState, 'list', []).length
    ));
    this.setItemsToDisplayStream(Observable.combineLatest(
      this.searchTermSubject,
      this.typeSubject,
      this.currentPage$,
      this.store.select(state => state.search),
      (searchTerm: string, type: string, currentPage: number, searchState: ISearchState) => {
        const perPage = _get(searchState, `[${getKey(type, searchTerm)}].perPage`, 0)
        return currentPage * perPage;
      }
    ));
    this.setStream(
      Observable.combineLatest(
        this.searchTermSubject,
        this.typeSubject,
        this.store.select(state => state.search),
        this.store.select(state => state.items),
        this.itemsToDisplay$,
        (searchTerm: string, type: string, searchState: ISearchState, items = {}, itemsToDisplay) => {
          const item = items[type]
          return _take(_get(searchState, `[${getKey(type, searchTerm)}].list`, []), itemsToDisplay).map(id => item[id])
        })
    )
  }

  public doLoad(reset: boolean = false, cb = () => this.nextPage()): void {
    if (!this.searchTerm) return;

    const loadedPage = this.getLoadedPage();
    const currentPage = this.getCurrentPage();
    const totalPages = this.getTotalPages();
    log('doLoad reset', reset);
    log('doLoad currentPage', currentPage);
    log('doLoad loadedPage', loadedPage);
    log('doLoad totalPages', totalPages);

    if (currentPage < loadedPage) {
      cb();
    } else {
      this.store.dispatch(actions.request(this.searchTerm, this.type, this.getQuery(), {
        page: reset ? 1 : loadedPage + 1,
        "_embed": true
      }, reset, cb));
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

  onTypeChange() {
    this.typeSubject.next(this.type);
    this.resetPage();
    this.scrollToTop();
  }

  ionViewDidLoad() {
    this.typeSubject.next(this.type);
    this.doLoad();
  }

  ionViewWillUnload() {
    this.fetchSubscription.unsubscribe();
  }
}
