import { ActionReducer, Action } from '@ngrx/store';
import { ADD_AUTHORS, CLEAN_AUTHORS, CLEAN_CACHE } from '../actions';

export interface IAuthorsState {
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

export const authorsReducer: ActionReducer<Object> = (state: IAuthorsState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_AUTHORS: {
            const { totalPages, totalItems, list, page } = payload;
            const ids = list.map((post) => post.id);
            return Object.assign({}, state, {
                page,
                totalPages,
                totalItems,
                list: state.list.concat(ids)
            });
        }

        case CLEAN_AUTHORS:
        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}