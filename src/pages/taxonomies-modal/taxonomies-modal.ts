import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { WpApiTaxonomies } from 'wp-api-angular'

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
  title: String;
  postType: String;
  term: String;
  list: Array<any>;
  // list$: Observable<Array<any>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wpApiTaxonomies: WpApiTaxonomies,
    public viewCtrl: ViewController
  ) {
    this.title = navParams.get('title');
    this.postType = navParams.get('postType');
    this.term = navParams.get('term');
    this.list = navParams.get('list');
    console.log('TaxonomiesPage', this.title, this.postType, this.term, this.list)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxonomiesPage');
    // this.list$ = this.wpApiTaxonomies.getList()
    //   .debounceTime(400)
    //   .retry(3)
    //   .map((r) => r.json());
  }

  itemSelected(e, taxonomy) {
    console.log('go to', e, taxonomy);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
