import {isAuthenticated} from './components/firebase/firebaseAuth';
import App from './components/App';
import SignIn from './components/SignIn';
import PhotoGrid from './components/PhotoGrid';
import Single from './components/Single';

export const paths = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    PHOTO_GRID: '/',
    SINGLE_PHOTO: '/view/:postId'
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
            }
        ]
    };
};