import { ActionReducer, Action } from '@ngrx/store';
import _kebabCase from 'lodash/kebabCase';
import _get from 'lodash/get';

import { CLEAN_CACHE } from '../actions';

export interface ISearchState {
    [key: string]: {
        error: boolean,
        submitting: boolean,
        loadedPage: number;
        totalPages: number;
        perPage: number;
        list: Array<number>
    }
}

const defaultItem = {
    error: false,
    submitting: false,
    loadedPage: 0,
    perPage: 0,
    totalPages: undefined,
    list: []
};


const defaultState = {};

export const types = {
    REQUEST: 'SEARCH/REQUEST',
    SUCCESS: 'SEARCH/SUCCESS',
    ERROR: 'SEARCH/ERROR',
}

export const actions = {
    request: (searchTerm, itemType, query, meta, reset = false, callback): Action => ({
        type: types.REQUEST,
        payload: { searchTerm, itemType, query, reset, meta, callback }
    }),
    success: (searchTerm, itemType, query, response, reset = false): Action => ({
        type: types.SUCCESS,
        payload: { searchTerm, itemType, reset, query, ...response }
    }),
    error: (searchTerm, itemType, query): Action => ({
        type: types.ERROR,
        payload: { searchTerm, itemType, query }
    }),
};

export function getKey(itemType, searchTerm) {
    return _kebabCase(`${itemType}-${_kebabCase(searchTerm)}`);
}

export const searchReducer: ActionReducer<Object> = (state: ISearchState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case types.REQUEST: {
            const { searchTerm, itemType, reset = false } = payload;
            const key = getKey(itemType, searchTerm);

            return {
                ...state,
                [key]: {
                    ...(state[key] || defaultItem),
                    submitting: true,
                    loadedPage: reset ? 0 : _get(state, `[${key}].loadedPage`, 0)
                }
            }
        }

        case types.SUCCESS: {
            const { itemType, query, searchTerm, totalPages, list = [], loadedPage = 0, reset = false } = payload;
            const ids = list.map((item) => item.id);
            const key = getKey(itemType, searchTerm);

            return {
                ...state,
                [key]: {
                    ...(state[key] || defaultItem),
                    submitting: false,
                    error: false,
                    loadedPage,
                    totalPages,
                    perPage: query.per_page,
                    list: (reset || !state[key] ? defaultItem : state[key]).list.concat(ids)
                }
            };
        }

        case types.ERROR: {
            const { itemType, searchTerm } = payload;
            const key = getKey(itemType, searchTerm);

            return {
                ...state,
                [key]: {
                    ...state[key],
                    submitting: false,
                    error: true,
                }
            }
        }

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}