import { postReducer } from './post';
import { postsReducer, IPostsState } from './posts';

export * from './post';
export * from './posts';

export interface AppState {
    post: Object;
    posts: IPostsState;
}

export default {
    post: postReducer,
    posts: postsReducer
}