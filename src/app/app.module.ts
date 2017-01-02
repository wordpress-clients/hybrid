import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WpApiModule } from 'wp-api-angular'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import '../i18n';
import { MyApp } from './app.component';
import StoreModules from '../store';
import Components from '../components';
import Pages from '../pages';
import Providers, { RawConfig } from '../providers';

// import { Settings } from '../providers/settings';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './build/i18n', '.json');
}

// export function provideSettings(storage: Storage) {
//   /**
//    * The Settings provider takes a set of default settings for your app.
//    *
//    * You can add new settings options at any time. Once the settings are saved,
//    * these values will not overwrite the saved values (this can be done manually if desired).
//    */
//   return new Settings(storage, {
//     option1: true,
//     option2: 'Ionitron J. Framework',
//     option3: '3',
//     option4: 'Hello'
//   });
// }
console.log('StoreModules', StoreModules);
@NgModule({
  declarations: [MyApp, ...Components, ...Pages],
  imports: [
    IonicModule.forRoot(MyApp),
    ...StoreModules,
    WpApiModule.initializeApp({
      baseUrl: RawConfig.api.baseUrl,
      namespace: RawConfig.api.namespace
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...Components, ...Pages],
  providers: [
    Storage,
    ...Providers,
    // { provide: Settings, useFactory: provideSettings, deps: [ Storage ] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
