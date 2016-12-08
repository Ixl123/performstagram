import React from 'react';
import {render} from 'react-dom';

import App from './components/App';
import PhotoGrid from './components/PhotoGrid';
import Single from './components/Single';
import store, {history} from './store';
// import css
import css from './styles/style.styl';
// import router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {getRoutes} from './routes';
import {initAuth} from './components/firebase/firebaseAuth';
const router = (
    <Provider store={store}>
        <Router history={history} routes={getRoutes(store.getState)}/>
    </Provider>
);

initAuth(store.dispatch).then(() => render(router, document.getElementById('root')))