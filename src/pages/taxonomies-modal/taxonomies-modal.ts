import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import debug from 'debug';

import { MenuMapping } from '../../../config/pages';
import { getNavParamsFromItem } from '../../utils/item';

const log = debug('TaxonomiesModal');
/*
  Generated class for the Taxonomies page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-taxonomies-modal',
  templateUrl: 'taxonomies-modal.html'
})
export class TaxonomiesModal {
  title: string;
  postType: string;
  term: string;
  list: Array<any>;
  // list$: Observable<Array<any>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
  ) {
    this.title = navParams.get('title');
    this.postType = navParams.get('postType');
    this.term = navParams.get('term');
    this.list = navParams.get('list');
  }

  openPage = (e, item) => {
    let params = getNavParamsFromItem(this.postType, item);
    log('about to open', this.postType, params)
    this.appCtrl.getRootNav().push(MenuMapping[this.term], params)
      .then(() => this.dismiss(), () => this.dismiss())
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  trackBy = (index: number, item) => item.id;

}
