import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

export class ListParent implements IListPage {
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
    itemsToDisplay$ = new BehaviorSubject<number>(0);
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
        this.perPage = this.getQuery().per_page || this.config.getApi('per_page', 5);
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setIsLoadingStream = (loading: Observable<any>) => this.isLoading$ = loading;
    setShowSpinnerStream = (showSpinner: Observable<any>) => this.showSpinner$ = showSpinner;
    setStoreStream = (store: Observable<any>) => this.store$ = store;
    setService = (service: any) => this.service = service;
    setType = (type: string) => this.type = type;
    setOptions = (options: any = {}) => this.options = options;
    updateItemsToDisplay = (init = false) => {
        if (init) this.page = 1;
        this.itemsToDisplay$.next(this.page * this.perPage);
        log('next page', this.page)
    }

    onRequest(reset: boolean) { }
    onSuccess(data: any, reset: boolean) { }
    onError() { }

    public isSubmitting(): any[] {
        let isSubmitting;
        this.store$.first().subscribe(listParams => isSubmitting = _get(listParams, 'submitting', false));
        return isSubmitting;
    }

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
                this.enablePagination();
                this.onSuccess(response, reset);
                this.updateItemsToDisplay();
                return response;
            })
            .catch(res => {
                log("error");
                this.shouldRetry = true;
                this.disablePagination();
                this.toast.show(this.translate.instant('error'));
                this.onError();

                return Observable.throw(res);
            });
    }

    enablePagination = () => this.isPaginationEnabled = true;
    disablePagination = () => this.isPaginationEnabled = false;

    doLoad() {
        this.fetch$()
            .first()
            .subscribe(() => log('doLoad success'));
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
        } else if (currentPage === totalPages) {
            this.disablePagination();
            infiniteScroll.complete();
        } else {
            this.fetch$().first().subscribe(({ totalPages, page }) => {
                const isComplete = totalPages <= page;
                infiniteScroll.complete();
                isComplete ? this.disablePagination() : this.enablePagination();
            }, (error) => infiniteScroll.complete());
        }

    }

    trackById = (index: number, item) => item.id;
}