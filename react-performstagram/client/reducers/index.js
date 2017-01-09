import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import posts from './posts';
import comments from './comments';
import auth from './auth';
import modal from './modal';
const rootReducer = combineReducers({posts, comments, routing: routerReducer, auth, modal});

export default rootReducer;