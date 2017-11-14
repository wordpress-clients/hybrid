import { Action } from '@ngrx/store';

export const SET_PUSHNOTIF_STATUS = 'SET_PUSHNOTIF_STATUS';

export const setPushNotificationStatus = (status: string): Action => ({
    type: SET_PUSHNOTIF_STATUS,
    payload: { status }
});