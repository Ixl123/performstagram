import {Action} from '@ngrx/store';
import {Auth} from './auth';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const INIT_AUTH = 'INIT_AUTH';

@Injectable()
export default class AuthActions {

    initAuth(auth : Auth) {
        return {type: INIT_AUTH, payload: auth};
    }
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
