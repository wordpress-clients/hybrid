import { TranslateService } from 'ng2-translate/ng2-translate';
import { WpApiPages } from 'wp-api-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { addPage } from '../../actions';
import { AppState } from '../../reducers';
import { ItemPage } from './../abstract/ItemPage';
import { Config, Toast } from './../../providers';
/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page',
  templateUrl: 'page.html'
})
export class PagePage extends ItemPage {
  constructor(
    public config: Config,
    public navParams: NavParams,
    public toast: Toast,
    public translate: TranslateService,
    public navCtrl: NavController,
    private wpApiPages: WpApiPages,
    private store: Store<AppState>
  ) {
    super(config, navParams, toast, translate);
    this.setStream(this.store.select((state) => state.page[this.navParams.get('id')]));
    this.setService(wpApiPages);
    this.setType('page');
  }

  onLoad(page) {
    this.store.dispatch(addPage(page));
  }
}
