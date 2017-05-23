import deepFreeze from 'deep-freeze';
import { DEFAULT_STATE, bookmarksReducer } from './bookmarks';
import {
    INIT, ADD_BOOKMARK, REMOVE_BOOKMARK,
    REMOVE_BOOKMARKS, CLEAN_CACHE
} from '../actions';

deepFreeze(DEFAULT_STATE);

describe('bookmarksReducer reducer', () => {
    it('should return the initial state with UNKNOWN, CLEAN_CACHE and INIT actions', () => {
        expect(
            bookmarksReducer(undefined, { type: 'UNKNOWN' })
        ).toEqual(DEFAULT_STATE);
        expect(
            bookmarksReducer(undefined, { type: CLEAN_CACHE })
        ).toEqual(DEFAULT_STATE);
        expect(
            bookmarksReducer(undefined, { type: INIT })
        ).toEqual(DEFAULT_STATE);
    });

    it('should ADD_BOOKMARK/REMOVE_BOOKMARK properly', () => {
        const state1 = bookmarksReducer(DEFAULT_STATE, {
            type: ADD_BOOKMARK,
            payload: {
                uid: 'posts:2585',
                timestamp: 1495568222337
            }
        });

        deepFreeze(state1);

        expect(state1).toEqual({
            'posts:2585': {
                type: 'posts',
                id: '2585',
                timestamp: 1495568222337
            }
        });

        const state2 = bookmarksReducer(state1, {
            type: REMOVE_BOOKMARK,
            payload: {
                uid: 'posts:2585'
            }
        });

        expect(state2).toEqual(DEFAULT_STATE);
    });

    it('should REMOVE_BOOKMARKS properly', () => {
        const state1 = bookmarksReducer(DEFAULT_STATE, {
            type: ADD_BOOKMARK,
            payload: {
                uid: 'posts:1',
                timestamp: 1495568222337
            }
        });

        deepFreeze(state1);

        const state2 = bookmarksReducer(state1, {
            type: ADD_BOOKMARK,
            payload: {
                uid: 'pages:2',
                timestamp: 1495568222337
            }
        });

        deepFreeze(state2);

        expect(state2).toEqual({
            'posts:1': {
                type: 'posts',
                id: '1',
                timestamp: 1495568222337
            },
            'pages:2': {
                type: 'pages',
                id: '2',
                timestamp: 1495568222337
            }
        });

        const state3 = bookmarksReducer(state2, {
            type: REMOVE_BOOKMARKS
        });

        expect(state3).toEqual(DEFAULT_STATE);
    });

    it('should INIT properly if has a payload', () => {
        const state1 = bookmarksReducer(DEFAULT_STATE, {
            type: INIT,
            payload: {
                bookmarks: {
                    'posts:1': {
                        type: 'posts',
                        id: '1',
                        timestamp: 1495568222337
                    },
                    'pages:2': {
                        type: 'pages',
                        id: '2',
                        timestamp: 1495568222337
                    }
                }
            }
        });

        expect(state1).toEqual({
            'posts:1': {
                type: 'posts',
                id: '1',
                timestamp: 1495568222337
            },
            'pages:2': {
                type: 'pages',
                id: '2',
                timestamp: 1495568222337
            }
        });
    });
});