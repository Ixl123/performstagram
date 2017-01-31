import {Record} from 'immutable';
import {INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from '../types/auth.types'
export const AuthState = new Record({authenticated: false, id: null, displayName: null});
const auth = (state = new AuthState(), {payload, type}) => {
    switch (type) {
        case INIT_AUTH:
        case SIGN_IN_SUCCESS:
            return state.merge({
                authenticated: !!payload,
                id: payload
                    ? payload.uid
                    : null,
                displayName: payload
                    ? payload.displayName
                    : null
            });
        case SIGN_OUT_SUCCESS:
            return new AuthState();
        default:
            return state;
    }
}
export default auth;