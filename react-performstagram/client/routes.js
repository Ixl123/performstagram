import {isAuthenticated} from './firebase/firebaseAuth';
import App from './App';
import SignIn from './auth/components/SignIn';
import PhotoGrid from './posts/components/PhotoGrid';
import Single from './posts/components/Single';

export const paths = {
    ROOT: '/photo-grid',
    NOMATCH: '/*',
    SIGN_IN: '/sign-in',
    PHOTO_GRID: '/photo-grid',
    SINGLE_PHOTO: '/single/:postId'
};

/**
 * to enter the application the user has to be signed in.
 * this method is called on every route where the user has to be signed in.
 * If the user is not signed he get rerouted to the signin view.
 */
const requireAuth = (getState) => {
    return (nextState, replace) => {
        if (!isAuthenticated(getState())) {
            replace(paths.SIGN_IN);

        }
    };
};

const requireUnauth = (getState) => {
    return (nextState, replace) => {
        if (isAuthenticated(getState())) {
            replace(paths.PHOTO_GRID);
        }
    };
};

export const getRoutes = (getState) => {
    return {
        path: paths.ROOT,
        component: App,
        childRoutes: [
            {
                indexRoute: {
                    component: PhotoGrid,
                    onEnter: requireAuth(getState)
                }
            }, {
                path: paths.SIGN_IN,
                component: SignIn,
                onEnter: requireUnauth(getState)
            }, {
                path: paths.SINGLE_PHOTO,
                component: Single,
                onEnter: requireAuth(getState)
            }, {
                path: paths.NOMATCH,
                component: PhotoGrid,
                onEnter: requireAuth(getState)
            }
        ]
    };
};