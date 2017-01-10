import { ActionReducer, Action } from '@ngrx/store';
import { ADD_PAGES, CLEAN_PAGES } from '../actions';

export interface IPagesState {
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

export const pagesReducer: ActionReducer<Object> = (state: IPagesState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_PAGES: {
            const { totalPages, totalItems, list, page } = payload;
            const ids = list.map((post) => post.id);
            return Object.assign({}, state, {
                page,
                totalPages,
                totalItems,
                list: state.list.concat(ids)
            });
        }

        case CLEAN_PAGES: {
            return defaultState;
        }

        default:
            return state;
    }
}