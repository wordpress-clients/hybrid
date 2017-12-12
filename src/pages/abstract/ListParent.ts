import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InfiniteScroll, Refresher, NavParams } from 'ionic-angular';
import { Injector, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import debug from 'debug';

import { AppState } from '../../reducers';
import { actions } from '../../reducers/list';
import { Toast, Config } from './../../providers';
import { IAPIError } from '../../APIInterfaces';
import { getUniqueStoreKey } from '../../utils/list';

const log = debug('List');

export interface IListResult {
    page: number;
    totalPages: number;
    totalItems: number;
    list: Array<any>;
}

export class ListParent {
    // Injections
    config: Config;
    navParams: NavParams;
    toast: Toast;
    translate: TranslateService;

    isPaginationEnabled: boolean = true;
    shouldRetry: boolean = false;
    page: number = 0;
    perPage: number;
    isLoading$: Observable<boolean>;
    showSpinner$: Observable<boolean>;
    store$: Observable<any>;
    stream$: Observable<any>;
    currentPage$: Observable<any>;
    itemsToDisplay$: Observable<number>;
    isPaginationEnabled$: Observable<boolean>;
    hasError$: Observable<boolean>;
    service: any;
    type: string;
    store: Store<AppState>;

    @ViewChild(InfiniteScroll) infinite: InfiniteScroll;

    constructor(
        public injector: Injector,
    ) {
        this.config = injector.get(Config, Config);
        this.navParams = injector.get(NavParams, NavParams);
        this.toast = injector.get(Toast, Toast);
        this.store = injector.get(Store, Store);
        this.translate = injector.get(TranslateService, TranslateService);
        this.perPage = this.getQuery().per_page || this.config.getApi('per_page', 5);
    }

    ionViewDidLoad() {
        this.store.dispatch(actions.resetPage(this.type, this.getQuery()));
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setIsLoadingStream = (loading: Observable<any>) => this.isLoading$ = loading;
    setShowSpinnerStream = (showSpinner: Observable<any>) => this.showSpinner$ = showSpinner;
    setStoreStream = (store: Observable<any>) => this.store$ = store;
    setHasErrorStream = (hasError: Observable<boolean>) => this.hasError$ = hasError;
    setCurrentPageStream = (page: Observable<number>) => this.currentPage$ = page;
    setItemsToDisplayStream = (itemsToDisplay: Observable<number>) => this.itemsToDisplay$ = itemsToDisplay;
    setIsPaginationEnableStream = (isPaginationEnabled: Observable<boolean>) => this.isPaginationEnabled$ = isPaginationEnabled;
    setService = (service: any) => this.service = service;

    public getSyncPropFromStore(property: string, otherwise: any): any {
        let prop;
        this.store$.first().subscribe(listParams => prop = _get(listParams, property, otherwise));
        return prop;
    }

    public isSubmitting = (): any[] => this.getSyncPropFromStore('submitting', false);
    public getCurrentList = (): any[] => this.getSyncPropFromStore('list', []);
    public getCurrentPage = (): number => this.getSyncPropFromStore('currentPage', 0);
    public getLoadedPage = (): number => this.getSyncPropFromStore('loadedPage', 0);
    public getTotalPages = (): number => this.getSyncPropFromStore('totalPages', 0);
    public getPerPage = (): number => this.getSyncPropFromStore('perPage', 0);


    public getQuery(): any {
        return Object.assign({
            per_page: this.perPage,
        }, this.config.get(`[${this.type}].query`, {}));
    }

    public getUniqueStoreKey(): string {
        return getUniqueStoreKey(this.type, this.getQuery())
    }

    public doLoad(reset: boolean = false, cb = () => { }): void {
        const loadedPage = this.getLoadedPage();
        const currentPage = this.getCurrentPage();
        const totalPages = this.getTotalPages();
        log('doLoad reset', reset);
        log('doLoad currentPage', currentPage);
        log('doLoad loadedPage', loadedPage);
        log('doLoad totalPages', totalPages);

        if (currentPage < loadedPage) {
            this.store.dispatch(actions.nextPage(this.type, this.getQuery()));
            cb();
        } else {
            this.store.dispatch(actions.request(this.type, this.getQuery(), {
                page: reset ? 1 : loadedPage + 1,
                "_embed": true
            }, reset, cb));
        }
    }

    enablePagination = () => this.isPaginationEnabled = true;
    disablePagination = () => this.isPaginationEnabled = false;

    doRefresh(refresher: Refresher): void {
        this.doLoad(true, () => refresher.complete());
    }

    doInfinite(infiniteScroll: InfiniteScroll): void {
        this.doLoad(false, () => infiniteScroll.complete());
    }

    trackById = (index: number, item) => item.id;
}