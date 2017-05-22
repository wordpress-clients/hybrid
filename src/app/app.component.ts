import { Store } from '@ngrx/store';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppState, IParamsState } from './../reducers';
import { Config, PushNotifications, Storage } from './../providers';
import { MenuMapping } from './../pages';

@Component({
  template: `
     <ion-split-pane>
      <ion-menu [content]="content" persistent="true">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>{{title}}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <menu [content]="content"></menu>
        </ion-content>
      </ion-menu>
    <ion-nav #content main [root]="rootPage"></ion-nav>

    </ion-split-pane>
  `
})
export class WPHC {
  @ViewChild(Nav) nav: Nav;
  title: string

  constructor(
    public platform: Platform,
    public store: Store<AppState>,
    public config: Config,
    public pushNotif: PushNotifications,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public storage: Storage,
  ) {
    const appNode: any = document.querySelector('ion-app');

    this.title = config.get('title', '');

    this.platform.ready().then(() => {
      const { page, params } = this.config.get('defaultPage', {});

      this.storage.run();

      if (!location.hash && page && MenuMapping[page]) { // redirect to default page
        this.nav.setRoot(MenuMapping[page], params);
      }

      this.store.select(state => state.params).map((params: IParamsState) => {
        appNode.style = `zoom: ${0.8 + (0.1 * params.zoom)}`
      }).subscribe();

      pushNotif.init();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
