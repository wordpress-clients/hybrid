import { postReducer } from './post';
import { postsReducer, IPostsState } from './posts';

export interface AppState {
    post: Object;
    posts: IPostsState;
}

export default {
    post: postReducer,
    posts: postsReducer
}