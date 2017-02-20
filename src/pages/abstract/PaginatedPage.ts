import { TranslateService } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs';
import { InfiniteScroll, Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { Injector } from '@angular/core';
import _get from 'lodash/get';

import { Toast, Config } from './../../providers';

export interface IListPage {
    onLoad(data: Object): void;
    onClean(): void;
}

export interface IListResult {
    page: number;
    totalPages: number;
    totalItems: number;
    list: Array<any>;
}

export class AbstractListPage {
    // Injections
    config: Config;
    navParams: NavParams;
    toast: Toast;
    translate: TranslateService;

    isPaginationEnabled: boolean = true;
    shouldRetry: boolean = false;
    page: number = 1;
    store$: Observable<any>;
    stream$: Observable<any>;
    service: any;
    type: string;
    params: any;

    constructor(
        public injector: Injector
    ) {
        this.config = injector.get(Config, Config);
        this.navParams = injector.get(NavParams, NavParams);
        this.toast = injector.get(Toast, Toast);
        this.translate = injector.get(TranslateService, TranslateService);
    }

    ionViewDidLoad() {
        console.log('[ListPage] init');
        let currentList;
        this.store$.take(1).subscribe(listParams => currentList = _get(listParams, 'list', []));
        if (!currentList.length) {
            this.doLoad();
        }
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setStore = (store: Observable<any>) => this.store$ = store;
    setService = (service: any) => this.service = service;
    setType = (type: string) => this.type = type;
    setParams = (params: any) => this.params = params;

    onLoad(data: Object) { }
    onClean() { }

    private getQuery(): Object {
        // if (this.type === 'customPosts' && this.navParams.get('slug')) {
        //     return this.config.get(`[${this.navParams.get('slug')}].query`, {})
        // } else if (this.type === 'taxonomiesPosts' && this.postType) {
        //     return this.config.get(`[${this.postType}].query`, {})
        // }
        return this.config.get(`[${this.type}].query`, {});
    }

    private fetch(): Observable<any> {
        let currentPage;
        this.store$.take(1).subscribe((listParams) => currentPage = _get(listParams, 'page', 0));
        console.log('currentPage', currentPage)
        const nextPage = currentPage += 1;
        const searchParams = Object.assign({
            per_page: this.config.getApi('perPage', 5),
        }, this.getQuery(), {
                page: nextPage,
                "_embed": true
            });
        const uRLSearchParams = new URLSearchParams();
        Object.keys(searchParams).map((key) => {
            uRLSearchParams.set(key, searchParams[key]);
        });

        console.log(`[ListPage] doLoad ${this.type}:${this.params} ${searchParams.page}`, searchParams);
        return this.service.getList({ search: uRLSearchParams })
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000))
            .retry(this.config.getApi('maxAttempt', 3) - 1)
            .map((r) => {
                this.shouldRetry = false;
                const totalPages = parseInt(r.headers.get('x-wp-totalpages'));
                this.onLoad({
                    page: nextPage,
                    totalPages,
                    totalItems: parseInt(r.headers.get('x-wp-total')),
                    list: r.json()
                });
                this.isPaginationEnabled = true;
                return totalPages <= nextPage;
            })
            .catch(res => {
                this.shouldRetry = true;
                this.isPaginationEnabled = false;
                this.toast.show(this.translate.instant('error'));

                console.log("[ListPage] error", res);
                return res;
            });
    }

    doLoad(): void {
        console.log('[ListPage] doLoad');
        this.fetch().take(1).subscribe(() => { }, () => { });
    }

    doRefresh(refresher: Refresher): void {
        console.log('[ListPage] doRefresh');
        this.onClean();
        this.fetch().take(1).subscribe(() => refresher.complete(), (error) => refresher.complete());
    }

    doInfinite(infiniteScroll: InfiniteScroll): void {
        console.log('[ListPage] doInfinite');
        this.fetch().take(1).subscribe((isComplete) => {
            infiniteScroll.complete();
            this.isPaginationEnabled = !isComplete;
        }, (error) => infiniteScroll.complete());
    }

    trackById = (index: number, item) => item.id;
}  