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

    isLoading$: Observable<boolean>;
    showSpinner$: Observable<boolean>;
    store$: Observable<any>;
    stream$: Observable<any>;
    itemsToDisplay$: Observable<number>;
    isPaginationEnabled$: Observable<boolean>;
    hasError$: Observable<boolean>;
    currentPage$ = new BehaviorSubject<number>(0);
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
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setIsLoadingStream = (loading: Observable<any>) => this.isLoading$ = loading;
    setShowSpinnerStream = (showSpinner: Observable<any>) => this.showSpinner$ = showSpinner;
    setStoreStream = (store: Observable<any>) => this.store$ = store;
    setHasErrorStream = (hasError: Observable<boolean>) => this.hasError$ = hasError;
    setItemsToDisplayStream = (itemsToDisplay: Observable<number>) => this.itemsToDisplay$ = itemsToDisplay;
    setIsPaginationEnableStream = (isPaginationEnabled: Observable<boolean>) => this.isPaginationEnabled$ = isPaginationEnabled;

    public getSyncPropFromStore(property: string, otherwise: any): any {
        let prop;
        this.store$.first().subscribe(listParams => prop = _get(listParams, property, otherwise));
        return prop;
    }

    public getLoadedPage = (): number => this.getSyncPropFromStore('loadedPage', 0);
    public getTotalPages = (): number => this.getSyncPropFromStore('totalPages', 0);

    public getCurrentPage(): any {
        let currentPage;
        this.currentPage$.first().subscribe(page => currentPage = page);
        return currentPage;
    }

    public getQuery(): any {
        return Object.assign({
            per_page: this.config.getApi('per_page', 5),
        }, this.config.get(`[${this.type}].query`, {}));
    }

    public getUniqueStoreKey(): string {
        return getUniqueStoreKey(this.type, this.getQuery())
    }

    public nextPage = () => this.currentPage$.next(this.getCurrentPage() + 1);

    public doLoad(reset: boolean = false, cb = () => this.nextPage()): void {
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
            this.store.dispatch(actions.request(this.type, this.getQuery(), {
                page: reset ? 1 : loadedPage + 1,
                "_embed": true
            }, reset, cb));
        }
    }

    doRefresh(refresher: Refresher): void {
        this.doLoad(true, () => {
            this.nextPage();
            refresher.complete();
        });
    }

    doInfinite(infiniteScroll: InfiniteScroll): void {
        this.doLoad(false, () => {
            this.nextPage();
            infiniteScroll.complete();
        });
    }

    trackById = (index: number, item) => item.id;
}