import {Action, ActionReducer} from '@ngrx/store';
import {Auth} from '../datatypes/auth';
import {AuthActions} from '../actions/auth.actions';

export const authReducer : ActionReducer < Auth > = (state : Auth = {
    authenticated: false,
    id: '',
    displayName: ''
}, {payload, type} : Action) => {
    switch (type) {
        case AuthActions.INIT_AUTH:
            return {
                ...state,
                authenticated: payload.authenticated,
                id: payload.id,
                displayName: payload.displayName
            };
        case AuthActions.SIGN_IN_SUCCESS:

            return {
                ...state,
                authenticated: payload.authenticated,
                id: payload.id,
                displayName: payload.displayName
            };

        case AuthActions.SIGN_OUT_SUCCESS:
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
