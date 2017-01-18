import {Action, ActionReducer} from '@ngrx/store';
import {Auth} from './auth';
import {SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, INIT_AUTH} from './auth.actions';

export const authReducer : ActionReducer < Auth > = (state : Auth = {
    authenticated: false,
    id: '',
    displayName: ''
}, {payload, type} : Action) => {
    switch (type) {
        case INIT_AUTH:
            return {
                ...state,
                authenticated: payload.authenticated,
                id: payload.id,
                displayName: payload.displayName
            };
        case SIGN_IN_SUCCESS:

            return {
                ...state,
                authenticated: payload.authenticated,
                id: payload.id,
                displayName: payload.displayName
            };

        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                authenticated: payload.authenticated,
                id: payload.id,
                displayName: payload.displayName
            };

        default:
            return state;
    }
};
