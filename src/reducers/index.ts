import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { authorReducer } from './author';
import { itemsReducer } from './items';
import { listReducer, IListState } from './list';

export * from './author';
export * from './bookmarks';
export * from './params';
export * from './items';
export * from './list';

export interface AppState {
    author: Object;
    params: IParamsState;
    bookmarks: Array<String>;
    items: any;
    list: IListState;
}

export const Reducers = {
    author: authorReducer,
    params: paramsReducer,
    bookmarks: bookmarksReducer,
    items: itemsReducer,
    list: listReducer,
}