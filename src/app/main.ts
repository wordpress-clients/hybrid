import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import debug from 'debug';

import { WPHCModule } from './app.module';

const logApp = debug('App');
const logSW = debug('SW');

platformBrowserDynamic()
    .bootstrapModule(WPHCModule)
    .then(() => {
        logApp('Bootstrapped')
        if ('serviceWorker' in navigator && __PROD__) {
            navigator.serviceWorker.register('worker-basic.js')
                .then((reg) => {
                    if (reg.installing) {
                        logSW('installing');
                    } else if (reg.waiting) {
                        logSW('installed');
                    } else if (reg.active) {
                        logSW('active');
                    }
                })
                .catch(err => console.error('error', err));
        }
    });
