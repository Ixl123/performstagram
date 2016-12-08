import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import posts from './posts';
import comments from './comments';
import auth from './auth';

const rootReducer = combineReducers({posts, comments, routing: routerReducer, auth});

export default rootReducer;