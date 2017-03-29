import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Push, PushObject } from '@ionic-native/push';

import { Config } from '../config';
// import PushWeb from './web';
import { IPushNotifications } from './interface';
import { setPushNotificationStatus } from '../../actions';

/*
  Generated class for the PushNotifications provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PushNotificationsForWordPress implements IPushNotifications {
  pushObject: PushObject;
  platform: string;
  registrationId: string;

  constructor(
    public http: Http,
    public config: Config,
    public plt: Platform,
    public push: Push,
  ) {
    if (this.plt.is('android')) {
      this.platform = 'Android';
    } else if (this.plt.is('ios')) {
      this.platform = 'iOS';
    } else if (this.plt.is('windows')) {
      this.platform = 'Windows';
    } else if (this.plt.is('core') || this.plt.is('mobileweb')) {
      this.platform = 'Web';
    }
  }

  init() {
    if (!this.isPlatformSupported()) {
      console.debug('[PushNotifications] platform not supported');
      return;
    }
    if (!this.config.getPushNotifications('enabled', false)) {
      console.debug('[PushNotifications] disabled');
      return;
    }
    console.debug('[PushNotifications] init');

    if (this.plt.is('android') || this.plt.is('ios') || this.plt.is('windows')) {
      this.pushObject = this.push.init({
        android: this.config.getPushNotifications('android', {}),
        ios: this.config.getPushNotifications('ios', {}),
        windows: this.config.getPushNotifications('windows', {}),
      });
    } else {
      // this.push = PushWeb.init({
      //   // pushServiceURL: 
      // });
      // Notification.requestPermission().then(function (result) {
      //   if (result === 'denied') {
      //     console.log('Permission wasn\'t granted. Allow a retry.');
      //     return;
      //   }
      //   if (result === 'default') {
      //     console.log('The permission request was dismissed.');
      //     return;
      //   }
      // });
    }

  }

  isPlatformSupported() {
    return this.plt.is('android')
      || this.plt.is('ios')
      || this.plt.is('windows')
    // || this.plt.is('core') && 'Notification' in window
    // || this.plt.is('mobileweb') && 'Notification' in window;
  }

  hasPermission() {
    if (!this.isPlatformSupported()) return Promise.reject({});

    if (this.plt.is('android') || this.plt.is('ios') || this.plt.is('windows')) {
      return this.pushObject.hasPermission().then(response => {
        console.debug('[PushNotifications] hasPermission', response.isEnabled);
        return Promise.resolve(response.isEnabled)
      });
    } else {
      // const hasPermission = Notification.permission === "granted";
      // console.debug('[PushNotifications] hasPermission', hasPermission);
      // return Promise.resolve(hasPermission);
    }
  }

  register() {
    console.debug('[PushNotifications] registering');
    if (!this.isPlatformSupported()) return Promise.reject({});

    if (this.plt.is('android') || this.plt.is('ios') || this.plt.is('windows')) {
      return new Promise(function (resolve, reject) {

        this.pushObject.on('registration').subscribe((data) => {
          console.debug('[PushNotifications] registrationId', data.registrationId);
          this.registrationId = data.registrationId;
          this.registerWebService()
            .then(() => {
              console.info('[PushNotifications] registered!');
              this.store.dispatch(setPushNotificationStatus('registered'));
              resolve();
            })
            .catch(() => {
              console.info('[PushNotifications] register failed!');
              this.store.dispatch(setPushNotificationStatus('registration:failed'));
              reject();
            });
        });

        this.pushObject.on('notification').subscribe((data) => {
          console.debug('[pushNotifications] notification data', data);

          // if (data.additionalData.foreground) {
          //   this.confirmNewContent(data.additionalData.id, data.message);
          // } else {
          //   this.openPost(data.additionalData.id);
          // }
          if (this.plt.is('ios')) {
            // this.instance.getApplicationIconBadgeNumber((n) => {
            //     console.debug('[pushNotifications] badge iOS count', n)
            //     const newNumber = n + 1;
            //     this.instance.setApplicationIconBadgeNumber(
            //         () => console.debug('[pushNotifications] badge number ok!'),
            //         () => console.debug('[pushNotifications] badge number error!'),
            //         newNumber);
            // }, () => console.debug('[pushNotifications] badge number error!'));
          }
        });

        this.pushObject.on('error').subscribe((error) => {
          console.debug('[pushNotifications] error registering', error);
        });
      });
    } else {

    }
  }

  unregister() {
    console.debug('[PushNotifications] unregistering');
    if (!this.isPlatformSupported()) return Promise.reject({});

    if (this.plt.is('android') || this.plt.is('ios') || this.plt.is('windows')) {
      this.pushObject.unregister();

      return new Promise(function (resolve, reject) {
        this.unregisterWebService().then(() => {
          return this.instance.unregister();
        }).then(() => {
          console.debug('[pushNotifications] unregistering success');
          this.store.dispatch(setPushNotificationStatus('unregistered'));
          resolve();
        }, () => {
          console.debug('[pushNotifications] unregistering failed');
          this.store.dispatch(setPushNotificationStatus('unregistration:failed'));
          reject();
        });
      });
    }
  }

  registerWebService = () => this.httpPost('/register');
  unregisterWebService = () => this.httpPost('/unregister');

  httpPost(endpoint = '/register', data = {}) {
    const baseUrl = this.config.getPushNotifications('baseUrl');

    if (!baseUrl) return Promise.reject(null);

    let body = new URLSearchParams();
    body.set('os', this.platform);
    body.set('token', this.registrationId);
    // body.set('lang', this.registrationId);

    // return this.http.post(baseUrl + endpoint, body)
    //   .toPromise()
    //   .map(r => r.json());
  }
}
