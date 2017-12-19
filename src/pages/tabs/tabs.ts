import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

import { IMenuItem } from './../../components/menu-items/menu-items';
import { MenuMapping } from './../../../config/pages';
import { Config } from './../../providers';

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // tabs config
  tabsHighlight: boolean;
  tabsColor: string;
  tabsPlacement: string;
  tabsMode: string;
  tabsLayout: string;

  list: IMenuItem[] = [];
  menuMapping: {
    [key: string]: any
  }
  @ViewChild('tabs') tabRef: Tabs;

  constructor(
    public config: Config,
  ) {
    this.menuMapping = MenuMapping;
    this.tabsHighlight = this.config.getTabs('highlight', true);
    this.tabsColor = this.config.getTabs('color', 'primary');
    this.tabsLayout = this.config.getTabs('layout', 'icon-top');
    this.tabsPlacement = this.config.getTabs('placement');
    this.tabsMode = this.config.getTabs('mode');
  }

  trackBy = (index: number, item) => index;
}
