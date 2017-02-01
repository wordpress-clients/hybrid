import { Store } from '@ngrx/store';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { PostsPage } from '../pages/posts/posts';
import { AppState, IParamsState } from './../reducers';


@Component({
  template: `
    <menu [content]="content"></menu>
    <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class MyApp {
  rootPage = PostsPage;

  @ViewChild(Nav) nav: Nav;

  constructor(
    translate: TranslateService,
    platform: Platform,
    private store: Store<AppState>
  ) {

    store.select('params')
      .map((params: IParamsState) => { 
        const appNode: any = document.querySelector('ion-app');
        appNode.style = `zoom: ${0.8 + (0.1 * params.zoom)}`
      })
      .subscribe();
    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    translate.use('en')

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
