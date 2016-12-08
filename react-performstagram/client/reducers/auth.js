import {Record} from 'immutable';

export const AuthState = new Record({authenticated: false, id: null});

const auth = (state = new AuthState(), {payload, type}) => {
    switch (type) {
        case 'INIT_AUTH':
        case 'SIGN_IN_SUCCESS':
            return state.merge({
                authenticated: !!payload,
                id: payload
                    ? payload.uid
                    : null
            });

        case 'SIGN_OUT_SUCCESS':
            return new AuthState();

        default:
            return state;
    }
}
export default auth;