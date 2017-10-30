import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { itemsReducer } from './items';
import { itemsSlugMappingReducer } from './itemsSlugMapping';
import { listReducer, IListState } from './list';
import { searchReducer, ISearchState } from './search';
import { pushNotificationsReducer, IPushNotifications } from './pushNotifications';

export * from './bookmarks';
export * from './params';
export * from './items';
export * from './itemsSlugMapping';
export * from './pushNotifications';

export interface AppState {
    params: IParamsState;
    bookmarks: Array<String>;
    items: any;
    itemsSlugMappingReducer: any;
    list: IListState;
    search: ISearchState;
    pushNotifications: IPushNotifications;
}

export const Reducers = {
    params: paramsReducer,
    bookmarks: bookmarksReducer,
    items: itemsReducer,
    itemsSlugMapping: itemsSlugMappingReducer,
    list: listReducer,
    search: searchReducer,
    pushNotifications: pushNotificationsReducer,
}