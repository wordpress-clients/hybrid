import { Observable } from 'rxjs';
import { PagePage } from './../page/page';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {
  Component, trigger, state,
  style, transition, animate
} from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { WpApiPages, WpApiPosts, WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';

import { Toast, Config } from './../../providers';
import { PaginatedPage, IPaginatedPage, IPaginatedResult } from '../abstract/PaginatedPage';
import { addList, cleanList } from '../../actions';
import { AppState, IListState } from '../../reducers';

/*
  Generated class for the Pages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
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
export class ListPage extends PaginatedPage implements IPaginatedPage {

  constructor(
    public config: Config,
    public navParams: NavParams,
    public toast: Toast,
    public translate: TranslateService,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiPages: WpApiPages,
    private wpApiPosts: WpApiPosts,
    private wpApiCustom: WpApiCustom,
  ) {
    super(config, navParams, toast, translate);
    // const [type = '', postType = ''] = this.navParams.get('type').split(':');

    this.setType(this.navParams.get('type'));
    // this.setPostType(postType);

    this.setStream(
      Observable.combineLatest(
        this.store.select(state => state.list && state.list[this.type]),
        this.store.select(state => state.item && state.item[this.type]),
        (listState: any, item) => {
          console.log('list', listState, item)
          return listState && listState.list.map(id => item[id])
        })).distinctUntilChanged()

    this.setStore(store.select(state => state.list && state.list[this.type]));

    if (this.type === 'page') this.setService(wpApiPages)
    else if (this.type === 'post') this.setService(wpApiPosts)
    else this.setService(wpApiCustom.getInstance(this.type))

  }

  onLoad({ page, totalPages, totalItems, list }: IPaginatedResult) {
    this.store.dispatch(addList(this.type, {
      page,
      totalPages,
      totalItems,
      list
    }));
  }

  onClean() {
    this.store.dispatch(cleanList(this.type));
  }

  openPage = (e, page) => {
    this.navCtrl.push(PagePage, {
      id: page.id
    })
  }

}
