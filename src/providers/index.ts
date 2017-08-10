import { Config } from './config';
import { Toast } from './toast';
import { Menu } from './menu';
import { Storage } from './storage';
import { ServiceWorkerProvider } from './service-worker/service-worker';
import { PushNotifications, PushNotificationsForWordPress } from './pushNotifications';

export * from './config';
export * from './toast';
export * from './menu';
export * from './storage';
export * from './service-worker/service-worker';
export * from './pushNotifications';

export const PROVIDERS = [
  Config,
  Toast,
  Menu,
  Storage,
  PushNotifications,
  PushNotificationsForWordPress,
  ServiceWorkerProvider,
];