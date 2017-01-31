import {firebaseAuth} from '../../firebase';
import * as actionTypes from '../types/auth.types';
import firebase from 'firebase';

/**
 * AUTH
 */
function authenticate(provider) {
    return (dispatch) => {
        firebaseAuth
            .signInWithPopup(provider)
            .then((result) => dispatch(signInSuccess(result.user)))
            .catch((error) => dispatch(signInError(error)));
    };
}
export const initAuth = (user) => {

    return {type: actionTypes.INIT_AUTH, payload: user};
}
export const signInError = (error) => {
    return {type: actionTypes.SIGN_IN_ERROR, payload: error};
}

export const signInSuccess = (result) => {

    return {type: actionTypes.SIGN_IN_SUCCESS, payload: result};

}

export const signInWithGithub = () => {
    return authenticate(new firebase.auth.GithubAuthProvider());
}

export const signInWithGoogle = () => {
    return authenticate(new firebase.auth.GoogleAuthProvider());
}

export const signInWithTestAccount = () => {
    return (dispatch) => {
        firebaseAuth
            .signInWithEmailAndPassword('default@default.de', 'default')
            .then((result) => dispatch(signInSuccess(result)))
            .catch((error) => dispatch(signInError(error)));
    };
}
export const signOut = () => {
    return (dispatch) => {
        firebaseAuth
            .signOut()
            .then(() => dispatch(signOutSuccess()));
    };
}

export const signOutSuccess = () => {
    return {type: actionTypes.SIGN_OUT_SUCCESS};
}
