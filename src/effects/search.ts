import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { WpApiCustom } from 'wp-api-angular';
import debug from 'debug';

import { types, actions } from '../reducers/search';
import { Config } from '../providers/config';

const log = debug('Effect:Search');

@Injectable()
export class SearchEffects {
    constructor(
        private actions$: Actions,
        private wpApiCustom: WpApiCustom,
        public config: Config,
    ) { }

    @Effect() login$ = this.actions$
        .ofType(types.REQUEST)
        .map(action => { log('action', action); return action; })
        .switchMap(({ payload: { searchTerm, itemType, query, meta, reset, callback } }) => {
            const uRLSearchParams = new URLSearchParams();
            const finalQuery = { ...query, ...meta };
            Object.keys(finalQuery).map((key) => {
                uRLSearchParams.set(key, finalQuery[key]);
            });

            log(`doLoad ${itemType}: ${finalQuery.page}`, finalQuery);

            return this.wpApiCustom
                .getInstance(itemType)
                .getList({ search: uRLSearchParams })
                .debounceTime(this.config.getApi('debounceTime', 400))
                .timeout(this.config.getApi('timeout', 10000))
                .retry(this.config.getApi('maxAttempt', 3) - 1)
                .map((r) => {
                    log("success");
                    const totalPages = parseInt(r.headers.get('x-wp-totalpages'));
                    const response = {
                        loadedPage: finalQuery.page,
                        totalPages,
                        list: r.json()
                    };
                    callback();
                    return actions.success(searchTerm, itemType, query, response, reset)
                })
                .catch((res: any) => {
                    log("error", res);
                    callback();
                    return Observable.of(actions.error(searchTerm, itemType, query));
                });
        });
}