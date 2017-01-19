import { ActionReducer, Action } from '@ngrx/store';
import get from 'lodash/get';

import { RawConfig } from './../providers/config';
import { SET_LOCALE, SET_ZOOM } from '../actions';

export interface IParamsState {
    locale: string;
    zoom: number;
}

const defaultState = {
    locale: get(RawConfig, 'defaultLanguage', 'en'),
    zoom: get(RawConfig, 'defaultZoom', 2)
};

export const paramsReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case SET_LOCALE: {
            return Object.assign({}, state, {
                locale: payload
            });
        }

        case SET_ZOOM: {
            return Object.assign({}, state, {
                zoom: payload
            });
        }

        default:
            return state;
    }
}