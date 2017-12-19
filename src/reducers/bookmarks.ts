import { ActionReducer, Action } from '@ngrx/store';
import {
    INIT, ADD_BOOKMARK, REMOVE_BOOKMARK,
    REMOVE_BOOKMARKS, CLEAN_CACHE
} from '../actions';

export interface IBookmarkState {
    [key: string]: {
        id: number;
        type: String;
        timestamp: number;
    }
}

export const DEFAULT_STATE = {};

export const bookmarksReducer: ActionReducer<Object> = (state: IBookmarkState = DEFAULT_STATE, action: Action) => {
    const payload = action.payload || {};

    switch (action.type) {
        case ADD_BOOKMARK: {
            const [type, id] = payload.uid.split(':');
            return Object.assign({}, state, {
                [payload.uid]: {
                    type,
                    id,
                    timestamp: payload.timestamp
                }
            });
        }

        case REMOVE_BOOKMARK: {
            const newState = Object.assign({}, state);
            delete newState[payload.uid];
            return newState;
        }

        case REMOVE_BOOKMARKS: {
            return {};
        }

        case INIT: {
            return payload.bookmarks || DEFAULT_STATE;
        }

        case CLEAN_CACHE: {
            return DEFAULT_STATE;
        }

        default:
            return state;
    }
}