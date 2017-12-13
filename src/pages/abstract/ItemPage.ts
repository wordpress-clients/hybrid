import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { Injector } from '@angular/core';
import debug from 'debug';

import { Toast, Config } from './../../providers';

const log = debug('ItemPage');

export interface IItemPage {
    onLoad(data: Object): void;
    onClean(): void;
}

export class AbstractItemPage {
    // Injections
    config: Config;
    navParams: NavParams;
    toast: Toast;
    translate: TranslateService;

    init: boolean = false;
    fetched: false;
    shouldRetry: boolean = false;
    stream$: Observable<any>;
    service: any;
    type: string;
    title: string;

    constructor(
        public injector: Injector
    ) {
        this.config = injector.get(Config, Config);
        this.navParams = injector.get(NavParams, NavParams);
        this.toast = injector.get(Toast, Toast);
        this.translate = injector.get(TranslateService, TranslateService);
    }

    ionViewDidLoad() {
        log('init');
        let isItemLoaded;
        this.stream$.take(1).subscribe(item => isItemLoaded = item !== undefined);
        if (!isItemLoaded) {
            this.doLoad();
        } else {
            this.init = true;
        }
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setService = (service: any) => this.service = service;
    // setType = (type: string) => this.type = type;
    setTitle = (title: string) => this.title = title;

    onLoad(data: Object) { }

    private getQuery(): Object {
        return this.config.get(`[${this.type}].query`, {})
    }

    private fetch(): Observable<any> {
        let searchParams;
        if (this.navParams.get('id')) {
            searchParams = Object.assign({}, this.getQuery(), { "_embed": true });
        } else if (this.navParams.get('slug')) {
            searchParams = Object.assign({
                slug: this.navParams.get('slug'),
            }, this.getQuery(), { "_embed": true });
        } else {
            throw new Error('No way to determine ID or Slug of the item')
        }

        const uRLSearchParams = new URLSearchParams();
        Object.keys(searchParams).map((key) => {
            uRLSearchParams.set(key, searchParams[key]);
        });

        log(`fetch ${this.type}`, searchParams);
        return (this.navParams.get('slug')
            ? this.service.getList({ search: uRLSearchParams })
            : this.service.get(this.navParams.get('id'), { search: uRLSearchParams }))
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000))
            .retry(this.config.getApi('maxAttempt', 3) - 1)
            .map((r) => {
                this.init = true;
                this.shouldRetry = false;
                this.onLoad(r.json());
            })
            .catch(res => {
                log('eee', res)
                this.init = true;
                this.shouldRetry = true;
                this.toast.show(this.translate.instant('error'));
                return res;
            });
    }

    doLoad = (): void => {
        log('doLoad');
        this.fetch().take(1).subscribe(() => { }, () => { });
    }

    doRefresh(refresher: Refresher): void {
        log('doRefresh');
        this.fetch().take(1).subscribe(() => refresher.complete(), (error) => refresher.complete());
    }

}