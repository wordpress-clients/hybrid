import { TranslateService } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs';
import { InfiniteScroll, Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';

import { Toast, Config } from './../../providers';

export interface IPaginatedPage {
    onLoad(data: Object): void;
    onClean(): void;
}

export interface IPaginatedResult {
    page: number;
    totalPages: number;
    totalItems: number;
    list: Array<any>;
}

export class PaginatedPage {
    isPaginationEnabled: boolean = true;
    shouldRetry: boolean = false;
    page: number = 1;
    store$: Observable<any>;
    stream$: Observable<any>;
    service: any;
    type: String;
    postType: String;

    constructor(
        public config: Config,
        public navParams: NavParams,
        public toast: Toast,
        public translate: TranslateService,
    ) {

    }

    ionViewDidLoad() {
        console.log('[PaginatedPage] init');
        let currentList;
        this.store$.take(1).subscribe(({ list }) => currentList = list);
        if (!currentList.length) {
            this.doLoad();
        }
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setStore = (store: Observable<any>) => this.store$ = store;
    setService = (service: any) => this.service = service;
    setType = (type: String) => this.type = type;
    setPostType = (postType: String) => this.postType = postType;

    onLoad(data: Object) { }
    onClean() { }

    private getQuery(): Object {
        if (this.type === 'customPosts' && this.navParams.get('slug')) {
            return this.config.get(`[${this.navParams.get('slug')}].query`, {})
        } else if (this.type === 'taxonomiesPosts' && this.postType) {
            return this.config.get(`[${this.postType}].query`, {})
        }
        return this.config.get(`[${this.type}].query`, {});
    }

    private fetch(): Observable<any> {
        let currentPage;
        this.store$.take(1).subscribe(({ page }) => currentPage = page);
        const nextPage = currentPage += 1;
        const searchParams = Object.assign({
            per_page: this.config.getApi('perPage', 10),
        }, this.getQuery(), {
                page: nextPage,
                "_embed": true
            });
        const uRLSearchParams = new URLSearchParams();
        Object.keys(searchParams).map((key) => {
            uRLSearchParams.set(key, searchParams[key]);
        });

        console.log(`[PaginatedPage] doLoad ${this.type}:${this.postType || ''} ${searchParams.page}`, searchParams);
        return this.service.getList({ search: uRLSearchParams })
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000), new Error('timeout exceeded'))
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
                this.translate.get('error').take(1).subscribe(trans => this.toast.show(trans));

                console.log("[PaginatedPage] error", res);
                return res;
            });
    }

    doLoad(): void {
        console.log('[PaginatedPage] doLoad');
        this.fetch().take(1).subscribe(() => { }, () => { });
    }

    doRefresh(refresher: Refresher): void {
        console.log('[PaginatedPage] doRefresh');
        this.onClean();
        this.fetch().take(1).subscribe(() => refresher.complete(), (error) => refresher.complete());
    }

    doInfinite(infiniteScroll: InfiniteScroll): void {
        console.log('[PaginatedPage] doInfinite');
        this.fetch().take(1).subscribe((isComplete) => {
            infiniteScroll.complete();
            this.isPaginationEnabled = !isComplete;
        }, (error) => infiniteScroll.complete());
    }

    trackById = (index: number, item) => item.id;
}  