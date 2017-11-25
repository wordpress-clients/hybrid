import { ActionReducer, Action } from '@ngrx/store';
import _get from 'lodash/get';

import { INIT, CLEAN_CACHE } from '../actions';
import { IAPIError } from '../APIInterfaces';
import { getUniqueStoreKey } from '../utils/list';

export interface IListState {
    [key: string]: {
        error: boolean,
        submitting: boolean,
        page: number;
        totalPages: number;
        totalItems: number;
        list: Array<number>
    }
}

export const types = {
    REQUEST: 'LIST/REQUEST',
    SUCCESS: 'LIST/SUCCESS',
    ERROR: 'LIST/ERROR',
}

export const actions = {
    request: (itemType, query, reset = false): Action => ({
        type: types.REQUEST,
        payload: { itemType, query, reset }
    }),
    success: (itemType, query, response, reset = false): Action => ({
        type: types.SUCCESS,
        payload: { itemType, reset, query, ...response }
    }),
    error: (itemType, query): Action => ({
        type: types.ERROR,
        payload: { itemType, query }
    }),
};

const defaultItem = {
    error: false,
    submitting: false,
    page: 0,
    totalPages: undefined,
    totalItems: undefined,
    list: []
};

const defaultState = {};

export const listReducer: ActionReducer<Object> = (state: IListState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case types.REQUEST: {
            const { itemType, query, reset = false } = payload;
            const key = getUniqueStoreKey(itemType, query);

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
            const { itemType, query, totalPages, totalItems, list = [], page = 0, reset = false } = payload;

            const ids = list.map((item) => item.id);
            const key = getUniqueStoreKey(itemType, query);
            if (state[key] && state[key].page === page) return state;

            return {
                ...state,
                [key]: {
                    ...(state[key] || defaultItem),
                    submitting: false,
                    error: false,
                    page,
                    totalPages,
                    totalItems,
                    list: (reset || !state[key] ? defaultItem : state[key]).list.concat(ids)
                }
            };
        }

        case types.ERROR: {
            const { itemType, query } = payload;
            const key = getUniqueStoreKey(itemType, query);

            return {
                ...state,
                [key]: {
                    ...state[key],
                    submitting: false,
                    error: true,
                }
            }
        }

        case INIT: {
            return payload.list || defaultState;
        }

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}
