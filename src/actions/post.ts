import { Action } from '@ngrx/store';

export const ADD_POST = 'ADD_POST';

export const addPost = (payload): Action => ({
    type: ADD_POST,
    payload
})