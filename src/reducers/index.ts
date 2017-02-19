import { postReducer } from './post';
import { pageReducer } from './page';
import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { postsReducer, IPostsState } from './posts';
import { pagesReducer, IPagesState } from './pages';
import { authorReducer } from './author';
import { authorsReducer, IAuthorsState } from './authors';
import { itemReducer } from './item';
import { listReducer, IListState } from './list';

export * from './post';
export * from './posts';
export * from './page';
export * from './pages';
export * from './author';
export * from './authors';
export * from './bookmarks';
export * from './params';
export * from './item';
export * from './list';

export interface AppState {
    post: Object;
    posts: IPostsState;
    page: Object;
    pages: IPagesState;
    author: Object;
    authors: IAuthorsState;
    params: IParamsState;
    bookmarks: Array<String>;
    item: Object;
    list: IListState;
}

export const Reducers = {
    post: postReducer,
    posts: postsReducer,
    page: pageReducer,
    pages: pagesReducer,
    author: authorReducer,
    authors: authorsReducer,
    params: paramsReducer,
    bookmarks: bookmarksReducer,
    item: itemReducer,
    list: listReducer,
}