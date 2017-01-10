import { PagePage } from './../page/page';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {
    Component, trigger, state,
    style, transition, animate
} from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { WpApiPages } from 'wp-api-angular';
import { Store } from '@ngrx/store';

import { Toast, Config } from './../../providers';
import { PaginatedPage, IPaginatedPage, IPaginatedResult } from '../abstract/PaginatedPage';
import { addPages, cleanPages } from '../../actions';
import { AppState, IPagesState } from '../../reducers';

/*
  Generated class for the Pages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pages',
  templateUrl: 'pages.html',
    animations: [
        trigger('appear', [
            state('in', style({ opacity: 1, transform: 'scale(1)' })),
            transition('void => in', [
                style({
                    opacity: 0,
                    transform: 'scale(0.8)'
                }),
                animate('0.2s ease-in')
            ]),
            transition('in => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'scale(0.8)'
                }))
            ])
        ])
    ]
})
export class PagesPage extends PaginatedPage implements IPaginatedPage {
    constructor(
        public config: Config,
        public navParams: NavParams,
        public toast: Toast,
        public translate: TranslateService,
        private navCtrl: NavController,
        private wpApiPages: WpApiPages,
        private store: Store<AppState>,
    ) {
        super(config, navParams, toast, translate);
        this.setStream(store.select('pages')
            .combineLatest(this.store.select('page'), (pages: IPagesState, page) => pages.list.map(id => page[id])));
        this.setStore(store.select('pages'));
        this.setService(wpApiPages);
        this.setType('pages');
    }

    onLoad({ page, totalPages, totalItems, list }: IPaginatedResult) {
        this.store.dispatch(addPages({
            page,
            totalPages,
            totalItems,
            list
        }));
    }

    onClean() {
        this.store.dispatch(cleanPages());
    }

    openPage = (e, page) => {
        this.navCtrl.push(PagePage, {
            id: page.id
        })
    }   

}
