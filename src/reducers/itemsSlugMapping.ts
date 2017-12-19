import { ActionReducer, Action } from '@ngrx/store';
import { INIT, ADD_ITEM, CLEAN_CACHE } from '../actions';
import { types as typesList } from './list';
import { types as searchList } from './search';

const defaultState = {
    pages: {},
    posts: {},
    tags: {},
    categories: {},
    users: {},
};

export const itemsSlugMappingReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_ITEM: {
            const { item, itemType } = payload;
            return Object.assign({}, state, {
                [itemType]: Object.assign({}, state[itemType], {
                    [item.slug]: item.id
                })
            });
        }

        case searchList.SUCCESS:
        case typesList.SUCCESS: {
            const { list, itemType } = payload;
            const newItems = {};

            list.forEach((item) => {
                newItems[item.slug] = item.id;
            });

            return Object.assign({}, state, {
                [itemType]: Object.assign({}, state[itemType], newItems)
            });
        }

        case INIT: {
            return payload.itemsSlugMapping || defaultState;
        }

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}