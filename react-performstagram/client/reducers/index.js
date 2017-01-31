import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import posts from '../posts/reducers/posts.reducer';
import comments from '../posts/reducers/comments.reducer';
import auth from '../auth/reducers/auth.reducer';
import modal from '../posts/reducers/modal.reducer';
const rootReducer = combineReducers({posts, comments, routing: routerReducer, auth, modal});

export default rootReducer;