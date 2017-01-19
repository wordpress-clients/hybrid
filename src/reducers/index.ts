import { postReducer } from './post';
import { pageReducer } from './page';
import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { postsReducer, IPostsState } from './posts';
import { pagesReducer, IPagesState } from './pages';

export * from './page';
export * from './post';
export * from './posts';
export * from './pages';
export * from './bookmarks';
export * from './params';

export interface AppState {
    page: Object;
    post: Object;
    posts: IPostsState;
    pages: IPagesState;
    params: IParamsState;
    bookmarks: Array<String>
}

export default {
    page: pageReducer,
    post: postReducer,
    posts: postsReducer,
    pages: pagesReducer,
    params: paramsReducer,
    bookmarks: bookmarksReducer
}