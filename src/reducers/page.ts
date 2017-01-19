import { ActionReducer, Action } from '@ngrx/store';
import { ADD_PAGE, ADD_PAGES, CLEAN_CACHE } from '../actions';

const defaultState = {};

export const pageReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_PAGE: {
            return Object.assign({}, state, {
                [payload.id]: payload
            });
        }
    
        case ADD_PAGES: {
            const { list } = payload;
            const newItems = {};

            list.forEach((post) => newItems[post.id] = post);
            return Object.assign({}, state, newItems);
        }
    
        case CLEAN_CACHE: {
            return defaultState;
        } 

        default:
            return state;
    }
}