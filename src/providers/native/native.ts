import { Injectable } from '@angular/core';
import debug from 'debug';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

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
    private config: Config,
    private statusBar: StatusBar,
    private admobFree: AdMobFree,
  ) { }

  init() {
    this.statusBarInit();
    this.addMobInit();
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

  addMobInit() {
    const bannerEnabled: boolean = this.config.getAdMob('bannerEnabled', false);
    const interstitialEnabled: boolean = this.config.getAdMob('interstitialEnabled', false);
    const config: AdMobFreeBannerConfig = this.config.getAdMob('config', {});

    log('addMob bannerEnabled', bannerEnabled);
    log('addMob interstitialEnabled', interstitialEnabled);
    log('addMob config', config);

    if (bannerEnabled) {
      this.admobFree.banner.config(config);
      this.admobFree.banner.prepare()
        .then(() => log('addMob banner ready'))
        .catch(error => log('addMob banner error', error));
    }

    if (interstitialEnabled) {
      this.admobFree.interstitial.config(config);

      this.admobFree.interstitial.prepare()
        .then(() => log('addMob interstitial ready'))
        .catch(error => log('addMob interstitial error', error));
    }

  }

}
