import { ActionReducer, Action } from '@ngrx/store';
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../actions';

const defaultState = [];

export const bookmarksReducer: ActionReducer<Array<String>> = (state: Array<String> = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_BOOKMARK: {
            return [...state, payload.id];
        }

        case REMOVE_BOOKMARK: {
            const index = state.indexOf(payload.id);
            if (index < 0) {
                return state;
            }
            console.log('REMOVE_BOOKMARK', index);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1, state.length)
            ]
        }

        default:
            return state;
    }
}