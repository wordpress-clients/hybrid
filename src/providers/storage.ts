import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import debug from 'debug';
import _get from 'lodash/get';
import _set from 'lodash/set';

import { AppState } from './../reducers';
import { IBookmarkState } from './../reducers/bookmarks';
import { INIT } from './../actions';
import { Config } from './config';

const log = debug('Storage');

@Injectable()
export class Storage {

    toSave = ['bookmarks', 'list', 'items', 'itemsSlugMapping', 'params']

    constructor(
        private store: Store<AppState>,
        public storage: IonicStorage,
        public config: Config,
    ) { }

    init() {
        const isEnabled = this.config.getStorage('enabled', false);
        log('isEnabled', isEnabled);
        if (!isEnabled) return;
        // POPULATE STORE
        // because this blocks => https://github.com/ngrx/store/pull/217
        let defaultState = {};
        const storagePromise = this.storage.forEach((val, key) => {
            defaultState[key] = val;
        });

        return storagePromise
            .then(() => this.store.dispatch({ type: INIT, payload: defaultState }))
    }

    start() {
        const isEnabled = this.config.getStorage('enabled', false);
        if (!isEnabled) return;
        this.store.select('bookmarks').skip(1).debounceTime(500).subscribe((bookmarks: IBookmarkState) => {
            const itemsToSave = {};
            Object.keys(bookmarks).map((key) => {
                const { type, id } = bookmarks[key];
                let item;
                this.store.select('items').first().subscribe(items => item = _get(items, `[${type}][${id}]`));
                _set(itemsToSave, `[${type}][${id}]`, item);
            })
            log('saving');
            this.storage.set('items', itemsToSave);
            this.storage.set('bookmarks', bookmarks);
        });
    }
}