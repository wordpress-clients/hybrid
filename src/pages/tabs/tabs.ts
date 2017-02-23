import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IMenuItem } from './../../components/menu-items/menu-items';
import { MenuMapping } from './../index';
/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  list: IMenuItem[] = [];
  menuMapping: {
    [key: string]: Component
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.menuMapping = MenuMapping;
  }

  ionViewDidLoad() {
    const options = this.navParams.get('options') || "{}";
    this.list = JSON.parse(options).list;
    console.log('ionViewDidLoad TabsPage', options, this.menuMapping);
  }

  trackBy = (index: number, item) => index;
}
