import { Injectable } from '@angular/core';
import { NgServiceWorker } from '@angular/service-worker';
import { ToastController } from 'ionic-angular';
import debug from 'debug';
/*
  Generated class for the ServiceWorkerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const log = debug('SW');

@Injectable()
export class ServiceWorkerProvider {

  constructor(
    public sw: NgServiceWorker,
    public toastCtrl: ToastController,
  ) {}

  init() {
    this.sw.log().subscribe(logs => log(logs));
    this.sw.updates.subscribe(res => {
      if (res.type === 'pending') {
        let toast = this.toastCtrl.create({
          message: 'A new version is available, reload ',
          closeButtonText: "Reload",
          showCloseButton: true,
        });
        toast.onDidDismiss((data, role) => {
          if (role === 'close') {
            this.sw.activateUpdate(res.version)
              .subscribe(value => value && location.reload());
          };
        });
        toast.present();
      }
    });
    this.sw.checkForUpdate();
  }
}
