import { TranslateService } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs';
import { Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';

import { Toast, Config } from './../../providers';

export interface IItemPage {
    onLoad(data: Object): void;
    onClean(): void;
}

export class ItemPage {
    fetched: false;
    shouldRetry: boolean = false;
    stream$: Observable<any>;
    service: any;
    type: String;
    title: String;

    constructor(
        public config: Config,
        public navParams: NavParams,
        public toast: Toast,
        public translate: TranslateService,
    ) {

    }

    ionViewDidLoad() {
        console.log('[ItemPage] init');
        let isItemLoaded;
        this.stream$.take(1).subscribe(item => isItemLoaded = item !== undefined);
        if (!isItemLoaded) {
            this.doLoad();
        }
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setService = (service: any) => this.service = service;
    setType = (type: String) => this.type = type;
    setTitle = (title: String) => this.title = title;

    onLoad(data: Object) { }

    private getQuery(): Object {
        return this.config.get(`[${this.type}].query`, {})
    }

    private fetch(): Observable<any> {
        const searchParams = Object.assign({}, this.getQuery(), {
            "_embed": true
        });
        const uRLSearchParams = new URLSearchParams();
        Object.keys(searchParams).map((key) => {
            uRLSearchParams.set(key, searchParams[key]);
        });

        console.log(`[ItemPage] fetch ${this.type}`, searchParams);
        return this.service.get(this.navParams.get('id'), { search: uRLSearchParams })
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000), new Error('timeout exceeded'))
            .retry(this.config.getApi('maxAttempt', 3) - 1)
            .map((r) => {
                this.shouldRetry = false;
                this.onLoad(r.json())
            })
            .catch(res => {
                this.shouldRetry = true;
                this.toast.show(this.translate.instant('error'));
                return res;
            });
    }

    doLoad = (): void => {
        console.log('[ItemPage] doLoad');
        this.fetch().take(1).subscribe(() => { }, () => { });
    }

    doRefresh(refresher: Refresher): void {
        console.log('[ItemPage] doRefresh');
        this.fetch().take(1).subscribe(() => refresher.complete(), (error) => refresher.complete());
    }

}