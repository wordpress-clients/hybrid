import { TranslateService } from 'ng2-translate/ng2-translate';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { setZoom, cleanCache } from './../../actions/params';
import { AppState } from '../../reducers';
import { IParamsState } from './../../reducers';
import { Toast } from './../../providers';

/*
  Generated class for the Params page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-params',
  templateUrl: 'params.html'
})
export class ParamsPage {
  zoom: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private store: Store<AppState>,
    private toast: Toast,
    private translate: TranslateService,
  ) {
    store.select('params').take(1).subscribe((params: IParamsState) => this.zoom = params.zoom);
  }

  ionViewDidLoad() {
    console.log('[ParamsPage] ionViewDidLoad');
  }

  doUpdateZoom() {
    this.store.dispatch(setZoom(this.zoom));
  }

  doCleanCache() {
    let okText;
    let notOkText;
    let prompTitle;
    let prompText;
    let cacheCleared;

    this.translate.get('OK').take(1).subscribe((translation) => okText = translation);
    this.translate.get('CANCEL').take(1).subscribe((translation) => notOkText = translation);
    this.translate.get('CACHE_CLEAR').take(1).subscribe((translation) => prompTitle = translation);
    this.translate.get('CACHE_CLEAR_PROMPT').take(1).subscribe((translation) => prompText = translation);
    this.translate.get('CACHE_CLEARED').take(1).subscribe((translation) => cacheCleared = translation);

    let confirm = this.alertCtrl.create({
      title: prompTitle,
      message: prompText,
      buttons: [
        {
          text: notOkText
        },
        {
          text: okText,
          handler: () => {
            this.store.dispatch(cleanCache());
            this.toast.show(cacheCleared);
          }
        }
      ]
    });
    confirm.present();
  }
}
