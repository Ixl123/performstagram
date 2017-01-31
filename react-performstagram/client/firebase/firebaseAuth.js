import {firebaseAuth} from './firebase';
import * as authActions from '../auth/actions/auth.actions';

export function initAuth(dispatch) {
    return new Promise((resolve, reject) => {
        const unsub = firebaseAuth.onAuthStateChanged((user) => {
            dispatch(authActions.initAuth(user));
            unsub();
            resolve();
        }, (error) => reject(error));
    });
}
export function getAuth(state) {
    return state.auth;
}

export function isAuthenticated(state) {
    return getAuth(state).authenticated;
}