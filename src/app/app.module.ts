import { NgModule, ErrorHandler, APP_INITIALIZER, Injector } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import '../i18n';
import { WPHC } from './app.component';
import { STORE } from '../store';
import { CustomWPHCModule } from '../../config/';
import { DeepLinkerLnks } from '../../config/pages/';
import { PIPES } from '../../config/pipes/';

@NgModule({
  declarations: [WPHC],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(WPHC, {}, {
      links: DeepLinkerLnks
    }),
    ...STORE,
    CustomWPHCModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [WPHC],
})
export class AppModule { }
