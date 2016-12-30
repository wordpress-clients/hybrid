import { ActionReducer, Action } from '@ngrx/store';
import { ADD_POSTS, CLEAN_POSTS } from '../actions';

export interface IPostsState {
    page: number;
    totalPages: number;
    totalItems: number;
    list: Array<any>
}

const defaultState = {
    page: 0,
    totalPages: undefined,
    totalItems: undefined,
    list: []
};

export const postsReducer: ActionReducer<Object> = (state: IPostsState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_POSTS: {
            const { totalPages, totalItems, list, page } = payload;
            const ids = list.map((post) => post.id);
            return Object.assign({}, state, {
                page,
                totalPages,
                totalItems,
                list: state.list.concat(ids)
            });
        }

        case CLEAN_POSTS: {
            return defaultState;
        }

        default:
            return state;
    }
}