import { Action } from '@ngrx/store';

export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

export const addBookmark = (id): Action => ({
    type: ADD_BOOKMARK,
    payload: {
        id
    }
})

export const removeBookmark = (id): Action => ({
    type: REMOVE_BOOKMARK,
    payload: {
        id
    }
})
