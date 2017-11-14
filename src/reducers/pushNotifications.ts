import { ActionReducer, Action } from '@ngrx/store';
import { SET_PUSHNOTIF_STATUS } from '../actions';

export interface IPushNotifications {
    status: string;
}

const defaultState = {
    status: ''
};

export const pushNotificationsReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case SET_PUSHNOTIF_STATUS: {
            return Object.assign({}, state, {
                status: payload.status
            });
        }

        default:
            return state;
    }
}