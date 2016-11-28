import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// import the root reducer

import rootReducer from './reducers/index';

import posts from './data/posts.1';
import comments from './data/comments.1';
// import react redux firebase wrapper

import {reduxReactFirebase, firebaseStateReducer} from 'redux-react-firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyD5LS2tKNkcAOgm5sWFr1Zf_KyQ6V-Fj_A',
    authDomain: 'performstagram.firebaseapp.com',
    databaseURL: 'https://performstagram.firebaseio.com',
    storageBucket: 'performstagram.appspot.com',
    messagingSenderId: '308270135999'
};

const defaultState = {
    posts,
    comments
}
const middleware = [createLogger(), thunk];
const enhancers = compose(applyMiddleware(...middleware), reduxReactFirebase(firebaseConfig), window.devToolsExtension
    ? window.devToolsExtension()
    : f => f)
const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
    module
        .hot
        .accept('./reducers/', () => {
            const nextRootReducer = requier('./reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
}

export default store;