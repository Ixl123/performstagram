import {isAuthenticated} from './components/firebase/firebaseAuth';
import App from './components/App';
import SignIn from './components/SignIn';
import PhotoGrid from './components/PhotoGrid';

export const paths = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    PHOTO_GRID: '/'
};

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
    debugger;
    console.log(App);
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
            }
        ]
    };
};