import { ActionReducer, Action } from '@ngrx/store';
import { ADD_SEARCH_LIST, CLEAN_SEARCH_LIST, CLEAN_CACHE } from '../actions';
import _kebabCase from 'lodash/kebabCase';

export interface ISearchState {
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

export function getKey(itemType, searchTerm) {
    return _kebabCase(`${itemType}-${_kebabCase(searchTerm)}`);
}

export const searchReducer: ActionReducer<Object> = (state: ISearchState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_SEARCH_LIST: {
            const { itemType, searchTerm, totalPages, totalItems, list = [], page = 0 } = payload;
            const ids = list.map((item) => item.id);
            const key = getKey(itemType, searchTerm);
            return Object.assign({}, state, {
                [key]: {
                    page: ids.length
                        ? page
                        : state[key]
                            ? state[key].page
                            : 0,
                    totalPages,
                    totalItems,
                    list: (state[key] || defaultItem).list.concat(ids)
                }
            });
        }

        case CLEAN_SEARCH_LIST: {
            const { itemType, searchTerm } = payload;
            let newState = Object.assign({}, state);
            delete newState[getKey(itemType, searchTerm)];
            return newState;
        }

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}