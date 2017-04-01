import { Action } from '@ngrx/store';

export const ADD_SEARCH_LIST = 'ADD_SEARCH_LIST';
export const CLEAN_SEARCH_LIST = 'CLEAN_SEARCH_LIST';

export const addSearchList = (searchTerm, itemType, query, payload): Action => ({
    type: ADD_SEARCH_LIST,
    payload: Object.assign(payload, { searchTerm, itemType, query })
})

export const cleanSearchList = (searchTerm, itemType): Action => ({
    type: CLEAN_SEARCH_LIST,
    payload: { searchTerm, itemType }
})