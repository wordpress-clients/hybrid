import { Action } from '@ngrx/store';

export const ADD_POSTS = 'ADD_POSTS';

export const addPosts = (payload): Action => ({
    type: ADD_POSTS,
    payload
})