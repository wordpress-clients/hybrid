import { postReducer } from './post';
import { pageReducer } from './page';
import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { postsReducer, IPostsState } from './posts';
import { pagesReducer, IPagesState } from './pages';
import { authorReducer } from './author';
import { authorsReducer, IAuthorsState } from './authors';

export * from './post';
export * from './posts';
export * from './page';
export * from './pages';
export * from './author';
export * from './authors';
export * from './bookmarks';
export * from './params';

export interface AppState {
    post: Object;
    posts: IPostsState;
    page: Object;
    pages: IPagesState;
    author: Object;
    authors: IAuthorsState;
    params: IParamsState;
    bookmarks: Array<String>
}

export const Reducers = {
    post: postReducer,
    posts: postsReducer,
    page: pageReducer,
    pages: pagesReducer,
    author: authorReducer,
    authors: authorsReducer,
    params: paramsReducer,
    bookmarks: bookmarksReducer
}