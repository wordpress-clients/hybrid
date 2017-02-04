import { TranslateService } from 'ng2-translate/ng2-translate';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { WpApiPages } from 'wp-api-angular';
import { Store } from '@ngrx/store';

import { Toast, Config } from './../../providers';
import { PaginatedPage, IPaginatedPage, IPaginatedResult } from '../abstract/PaginatedPage';
import { addPages, cleanPages } from '../../actions';
import { AppState, IPagesState } from '../../reducers';/*
  Generated class for the Taxonomy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-taxonomy',
  templateUrl: 'taxonomy.html'
})
export class TaxonomyPage extends PaginatedPage implements IPaginatedPage {
  term: string;
  postType: string;

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
    this.term = this.navParams.get('term');
    this.postType = this.navParams.get('postType');

    this.setStream(store.select('pages')
      .combineLatest(this.store.select('page'), (pages: IPagesState, page) => pages.list.map(id => page[id])));
    this.setStore(store.select('pages'));
    this.setService(wpApiPages);
    this.setType('pages');
  }

  // getTitle(term, slug) {
  //   let trans = '';
  //   if (term === "categories") {
  //     trans = slug ? 'category.title' : 'categories.title';
  //   } else if (term === "tags") {
  //     trans = slug ? 'tag.title' : 'tags.title';
  //   } else {
  //     trans = slug ? 'customTaxonomy.title' : 'menu.customTaxonomy';
  //   }
  //   if (slug) {
  //     return this.$filter('translate')(trans, {
  //       name: decodeURIComponent(slug),
  //       term: this.$stateParams.term
  //     });
  //   }
  //   return this.$filter('translate')(trans);
  // }


}
