import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reduxReactFirebase, firebaseStateReducer} from 'redux-react-firebase';
import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({posts, comments, routing: routerReducer, firebase: firebaseStateReducer});

export default rootReducer;