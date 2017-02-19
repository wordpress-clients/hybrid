import { ActionReducer, Action } from '@ngrx/store';
import { ADD_LIST, CLEAN_LIST, CLEAN_CACHE } from '../actions';

export interface IListState {
    [key: string]: {
        page: number;
        totalPages: number;
        totalItems: number;
        list: Array<any>
    }
}

const defaultItem = {
    page: 0,
    totalPages: undefined,
    totalItems: undefined,
    list: []
};

const defaultState = {};

export const listReducer: ActionReducer<Object> = (state: IListState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_LIST: {
            const { itemType, totalPages, totalItems, list = [], page = 0 } = payload;
            const ids = list.map((item) => item.id);
            return Object.assign({}, state, {
                [itemType]: {
                    page,
                    totalPages,
                    totalItems,
                    list: (state[itemType] || defaultItem).list.concat(ids)
                }
            });
        }

        case CLEAN_LIST:
        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}