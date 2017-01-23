import {Action, ActionReducer} from '@ngrx/store';
import Post from './post';
import {PostActions} from './post.actions';

export const postReducer : ActionReducer < Array < Post > > = (state = [], {payload, type} : Action) => {
    switch (type) {
        case PostActions.LOAD_POSTS_SUCCESS:
            return payload
        case PostActions.CREATE_POST_SUCCESS:
            return state;
        case PostActions.UPDATE_POST_SUCCESS:
            return state.map((post) => post.code === payload.post.code
                ? payload.post
                : post);
        default:
            return state;
    }
};
