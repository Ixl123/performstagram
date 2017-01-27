import {Action} from '@ngrx/store';
import {Auth} from '../datatypes/auth';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthActions {
    static SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
    static SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
    static SIGN_IN_ERROR = 'SIGN_IN_ERROR';
    static INIT_AUTH = 'INIT_AUTH';
    static NAVIGATE_TO_SIGNIN = 'NAVIGATE_TO_SIGNIN'
    initAuth(auth : Auth) {
        return {type: AuthActions.INIT_AUTH, payload: auth};
    }
    signInError(error : any) : Action {
        return {type: AuthActions.SIGN_IN_SUCCESS, payload: error};
    }

    signInSuccess(auth : Auth) : Action {
        return {type: AuthActions.SIGN_IN_SUCCESS, payload: auth};
    }
    signOutSuccess(auth : Auth) : Action {
        return {type: AuthActions.SIGN_OUT_SUCCESS, payload: auth}
    }
    navigateToSignIn() : Action {
        return {type: AuthActions.NAVIGATE_TO_SIGNIN}
    }
}
