import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { itemsReducer } from './items';
import { listReducer, IListState } from './list';
import { pushNotificationsReducer, IPushNotifications } from './pushNotifications';

export * from './bookmarks';
export * from './params';
export * from './items';
export * from './list';
export * from './pushNotifications';

export interface AppState {
    params: IParamsState;
    bookmarks: Array<String>;
    items: any;
    list: IListState;
    pushNotifications: IPushNotifications;
}

export const Reducers = {
    params: paramsReducer,
    bookmarks: bookmarksReducer,
    items: itemsReducer,
    list: listReducer,
    pushNotifications: pushNotificationsReducer,
}