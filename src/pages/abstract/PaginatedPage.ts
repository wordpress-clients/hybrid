import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { InfiniteScroll, Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { Injector, ViewChild } from '@angular/core';
import _get from 'lodash/get';
import debug from 'debug';

import { Toast, Config } from './../../providers';
import { IAPIError } from '../../APIInterfaces';
import { getUniqueStoreKey } from '../../utils/list';

const log = debug('List');

export interface IListPage {
    onRequest(reset: boolean): void;
    onSuccess(data: any, reset: boolean): void;
    onError(data: any): void;
}

export interface IListResult {
    page: number;
    totalPages: number;
    totalItems: number;
    list: Array<any>;
}

export class AbstractListPage implements IListPage {
    // Injections
    config: Config;
    navParams: NavParams;
    toast: Toast;
    translate: TranslateService;

    isPaginationEnabled: boolean = true;
    shouldRetry: boolean = false;
    page: number = 1;
    perPage: number;
    isLoading$: Observable<boolean>;
    store$: Observable<any>;
    stream$: Observable<any>;
    itemsToDisplay$ = new Subject<number>();
    service: any;
    type: string;
    options: any = {};

    @ViewChild(InfiniteScroll) infinite: InfiniteScroll;

    constructor(
        public injector: Injector
    ) {
        this.config = injector.get(Config, Config);
        this.navParams = injector.get(NavParams, NavParams);
        this.toast = injector.get(Toast, Toast);
        this.translate = injector.get(TranslateService, TranslateService);
        this.updateItemsToDisplay();
        console.log('this.type 2', this.type)
    }

    ionViewDidLoad() {
        log('ionViewDidLoad');
        this.perPage = this.getQuery().per_page || this.config.getApi('per_page', 5);
        this.doInit();
    }

    doInit() {
        this.isPaginationEnabled = true;
        this.page = 0;
    }

    // @TODO: remove when fixed: https://github.com/driftyco/ionic/issues/9209
    resetInfiniteScroll() {
        this.infinite._onScroll({
            timeStamp: Date.now(),
            scrollTop: 1,
            scrollLeft: 1,
            scrollHeight: 1,
            scrollWidth: 1,
            contentHeight: 1,
            contentWidth: 1,
            contentTop: 1,
            contentBottom: 1,
            startY: 1,
            startX: 1,
            deltaY: 1,
            deltaX: 1,
            velocityY: 1,
            velocityX: 1,
            directionY: '',
            directionX: '',
            domWrite: null
        });
        this.infinite._lastCheck = 0;
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setLoading = (loading: Observable<any>) => this.isLoading$ = loading;
    setStore = (store: Observable<any>) => this.store$ = store;
    setService = (service: any) => this.service = service;
    setType = (type: string) => this.type = type;
    setOptions = (options: any = {}) => this.options = options;
    updateItemsToDisplay = (resetInfiniteScroll = true) => {
        this.itemsToDisplay$.next(this.page * this.perPage);
        resetInfiniteScroll && setTimeout(() => this.resetInfiniteScroll(), 200);
    }

    onRequest(reset: boolean) { }
    onSuccess(data: any, reset: boolean) { }
    onError(error: IAPIError) { }

    public getCurrentList(): any[] {
        let currentList;
        this.store$.first().subscribe(listParams => currentList = _get(listParams, 'list', []));
        return currentList;
    }

    public getCurrentPage(): number {
        let currentPage;
        this.store$.first().subscribe(listParams => currentPage = _get(listParams, 'page', 0));
        return currentPage;
    }

    public getTotalPages(): number {
        let totalPages;
        this.store$.first().subscribe(listParams => totalPages = _get(listParams, 'totalPages'));
        return totalPages;
    }

    public getQuery(): any {
        return this.config.get(`[${this.type}].query`, {});
    }

    public getUniqueStoreKey(): string {
        return getUniqueStoreKey(this.type, this.getQuery())
    }

    public fetch$(reset: boolean = false): Observable<any> {
        this.onRequest(reset);
        const currentPage = this.getCurrentPage();

        const nextPage = currentPage + 1;
        const searchParams = Object.assign({
            per_page: this.perPage,
        }, this.getQuery(), {
                page: nextPage,
                "_embed": true
            });
        const uRLSearchParams = new URLSearchParams();
        Object.keys(searchParams).map((key) => {
            uRLSearchParams.set(key, searchParams[key]);
        });

        debug(`doLoad ${this.type}:${this.options} ${searchParams.page}`, searchParams);
        return this.service.getList({ search: uRLSearchParams })
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000))
            .retry(this.config.getApi('maxAttempt', 3) - 1)
            .map((r) => {
                this.shouldRetry = false;
                const totalPages = parseInt(r.headers.get('x-wp-totalpages'));
                const response = {
                    page: nextPage,
                    totalPages,
                    totalItems: parseInt(r.headers.get('x-wp-total')),
                    list: r.json()
                };
                this.page = nextPage;
                this.isPaginationEnabled = true;
                this.onSuccess(response, reset);
                this.updateItemsToDisplay();
                return response;
            })
            .catch(res => {
                this.shouldRetry = true;
                this.isPaginationEnabled = false;
                this.toast.show(this.translate.instant('error'));
                this.onError(res.json());

                log("error", res);
                return res;
            });
    }

    doRefresh(refresher: Refresher): void {
        this.fetch$(true)
            .first()
            .subscribe(() => refresher.complete(), (error) => refresher.complete());
    }

    doInfinite(infiniteScroll: InfiniteScroll): void {
        const currentPage = this.getCurrentPage();
        const totalPages = this.getTotalPages();
        log('doInfinite');
        log('doInfinite page', this.page);
        log('doInfinite currentPage', currentPage);
        log('doInfinite totalPages', totalPages);

        if (this.page < currentPage) {
            this.page += 1;
            this.updateItemsToDisplay();
            infiniteScroll.complete();
        } else {
            if (currentPage === totalPages) {
                this.isPaginationEnabled = false;
            } else {
                this.fetch$().first().subscribe(({ totalPages, page }) => {
                    const isComplete = totalPages <= page;
                    infiniteScroll.complete();
                    this.isPaginationEnabled = !isComplete;
                }, (error) => infiniteScroll.complete());
            }
        }

    }

    trackById = (index: number, item) => item.id;
}