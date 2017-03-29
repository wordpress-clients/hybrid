import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic-native/push';
import { Toast } from '@ionic-native/toast';
import { Storage } from '@ionic/storage';

import {
  WpApiModule,
  WpApiLoader,
  WpApiStaticLoader
} from 'wp-api-angular'
import { MomentModule } from 'angular2-moment';
import {
  TranslateModule, TranslateLoader, TranslateStaticLoader
} from 'ng2-translate/ng2-translate';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import '../i18n';
import { WPHC } from './app.component';
import { STORE } from '../store';
import { COMPONENTS } from '../components';
import { PAGES, DeepLinkerLnks } from '../pages';
import { PROVIDERS, Config } from '../providers';
import '../service-worker.js';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './build/i18n', '.json');
}

export function WpApiLoaderFactory(http: Http, config: Config) {
  return new WpApiStaticLoader(http, config.getApi('baseUrl', ''), config.getApi('namespace', ''));
}

export function provideStorage() {
  return new Storage({ name: '__wphc' });
}

@NgModule({
  declarations: [...COMPONENTS, ...PAGES, WPHC],
  imports: [
    IonicModule.forRoot(WPHC, {}, {
      links: DeepLinkerLnks
    }),
    ...STORE,
    WpApiModule.forRoot({
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http, Config]
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [...COMPONENTS, ...PAGES, WPHC],
  providers: [
    // Storage,
    ...PROVIDERS,
    StatusBar,
    SplashScreen,
    Push,
    Toast,
    { provide: Storage, useFactory: provideStorage },
    // { provide: Settings, useFactory: provideSettings, deps: [ Storage ] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class WPHCModule { }
