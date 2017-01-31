import React from 'react';
import {render} from 'react-dom';

import App from './App';
import PhotoGrid from './posts/components/PhotoGrid';
import Single from './posts/components/Single';
import store, {history} from './store';
// import css
import css from './styles/style.styl';
// import router
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {getRoutes} from './routes';
import {initAuth} from './firebase/firebaseAuth';
const router = (
    <Provider store={store}>
        <Router history={history} routes={getRoutes(store.getState)}/>
    </Provider>
);

initAuth(store.dispatch).then(() => render(router, document.getElementById('root')))