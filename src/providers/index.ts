import { Config } from './config';
import { Toast } from './toast';
import { Menu } from './menu';
import { Storage } from './storage';
import { PushNotifications, PushNotificationsForWordPress } from './pushNotifications';

export * from './config';
export * from './toast';
export * from './menu';
export * from './storage';
export * from './pushNotifications';

export const PROVIDERS = [
  Config,
  Toast,
  Menu,
  Storage,
  PushNotifications,
  PushNotificationsForWordPress,
];