import { Action } from '@ngrx/store';

export const ADD_ITEM = 'ADD_ITEM';

export const addItem = (itemType, payload): Action => ({
    type: ADD_ITEM,
    payload: Object.assign(payload, { itemType })
})