import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import Signup from './components/Signup'
import PhotoGrid from './components/PhotoGrid';
import Single from './components/Single';
import store, {history} from './store';
import {Provider, connect} from 'react-redux';
// import css
import css from './styles/style.styl'
// import router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const targetEl = document.getElementById('root')
const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Signup}></IndexRoute>
                <Route path='/view/:postId' component={Single}></Route>
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(router, targetEl)