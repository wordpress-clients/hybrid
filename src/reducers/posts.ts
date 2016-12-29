import { ListMasterPage } from './../../myapp/src/pages/list-master/list-master';
import { ActionReducer, Action } from '@ngrx/store';
import { ADD_POSTS } from '../actions';

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
            const { totalPages, totalItems, list } = payload;
            const ids = list.map((post) => post.id);
            return Object.assign({}, state, {
                totalPages,
                totalItems,
                list: state.list.concat(ids)
            });
        }

        default:
            return state;
    }
}