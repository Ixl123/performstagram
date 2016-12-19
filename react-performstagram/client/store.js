import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';

// import the root reducer

import rootReducer from './reducers/index';

import posts from './data/posts.1';
import comments from './data/comments.1';
import AuthState from './reducers/auth'

const defaultState = {
    posts,
    comments
}
const middleware = applyMiddleware(thunk);

const enhancers = compose(middleware, window.devToolsExtension
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