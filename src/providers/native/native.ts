import { Injectable } from '@angular/core';
import debug from 'debug';
import { StatusBar } from '@ionic-native/status-bar';

import { Config } from '../config';

const log = debug('Native');
/*
  Generated class for the NativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class NativeProvider {

  constructor(
    public config: Config,
    public statusBar: StatusBar,
  ) { }

  init() {
    this.statusBarInit();
  }

  statusBarInit() {
    const show = this.config.getStatusBar('show', true);
    const color = this.config.getStatusBar('color', '#ffffff');
    const overlaysWebView = this.config.getStatusBar('overlaysWebView', true);
    const style = this.config.getStatusBar('style', 'default');

    log('statusBar options', { show, color, overlaysWebView, style });

    this.statusBar.overlaysWebView(overlaysWebView);
    this.statusBar[show ? 'show' : 'hide']();
    this.statusBar.backgroundColorByHexString(color);

    if (style === 'default') {
      this.statusBar.styleDefault();
    } else if (style === 'light') {
      this.statusBar.styleLightContent();
    } else if (style === 'blackTranslucent') {
      this.statusBar.styleBlackTranslucent();
    } else if (style === 'blackOpaque') {
      this.statusBar.styleBlackOpaque();
    }
  }

}
