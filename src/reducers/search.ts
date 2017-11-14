import { ActionReducer, Action } from '@ngrx/store';
import _kebabCase from 'lodash/kebabCase';
import _get from 'lodash/get';

import { IAPIError } from '../APIInterfaces';
import { CLEAN_CACHE } from '../actions';

export interface ISearchState {
    [key: string]: {
        page: number;
        error: boolean,
        submitting: boolean,
        totalPages: number;
        totalItems: number;
        list: Array<any>
    }
}

const defaultItem = {
    page: 0,
    error: false,
    submitting: false,
    totalPages: undefined,
    totalItems: undefined,
    list: []
};

const defaultState = {};

export const types = {
    REQUEST: 'SEARCH/REQUEST',
    SUCCESS: 'SEARCH/SUCCESS',
    ERROR: 'SEARCH/ERROR',
}

export const actions = {
    request: (searchTerm, itemType, query, reset = false): Action => ({
        type: types.REQUEST,
        payload: { searchTerm, itemType, query, reset }
    }),
    success: (searchTerm, itemType, query, response, reset = false): Action => ({
        type: types.SUCCESS,
        payload: { searchTerm, itemType, reset, query, ...response }
    }),
    error: (searchTerm, itemType, query, error: IAPIError): Action => ({
        type: types.ERROR,
        payload: { searchTerm, itemType, error, query }
    }),
};

export function getKey(itemType, searchTerm) {
    return _kebabCase(`${itemType}-${_kebabCase(searchTerm)}`);
}

export const searchReducer: ActionReducer<Object> = (state: ISearchState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case types.REQUEST: {
            const { searchTerm, itemType, query, reset = false } = payload;
            const key = getKey(itemType, searchTerm);

            return {
                ...state,
                [key]: {
                    ...(state[key] || defaultItem),
                    submitting: true,
                    page: reset ? 0 : _get(state, `[${key}].page`, 0)
                }
            }
        }

        case types.SUCCESS: {
            const { itemType, searchTerm, totalPages, totalItems, list = [], page = 0, reset = false } = payload;
            const ids = list.map((item) => item.id);
            const key = getKey(itemType, searchTerm);
            return Object.assign({}, state, {
                [key]: {
                    page,
                    submitting: false,
                    error: false,
                    totalPages,
                    totalItems,
                    list: (reset || !state[key] ? defaultItem : state[key]).list.concat(ids)
                }
            });
        }

        case types.ERROR: {
            const { itemType, searchTerm, error } = payload;
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