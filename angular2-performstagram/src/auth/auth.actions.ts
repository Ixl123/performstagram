import {Action} from '@ngrx/store';
import {Auth} from './auth';
import {Observable} from 'rxjs/Rx';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

export default class AuthActions {

    // ===================================  CREATE
    // -----------------------------------

    signInError(error : any) : Action {
        return {type: SIGN_IN_SUCCESS, payload: error};
    }

    signInSuccess(auth : Auth) : Action {
        return {type: SIGN_IN_SUCCESS, payload: auth};
    }
    signOutSuccess(auth : Auth) : Action {
        return {type: SIGN_OUT_SUCCESS, payload: auth}
    }
}
