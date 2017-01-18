import {Action, ActionReducer} from '@ngrx/store';
import Posts from './posts';
import {PostActions} from './post.actions';

export const postReducer : ActionReducer < Posts > = (state, {payload, type} : Action) => {
    debugger;
    console.log(type);

    debugger;
    switch (type) {
        case PostActions.LOAD_POSTS_SUCCESS:
            debugger;
            return payload;
        case PostActions.CREATE_POST_SUCCESS:
            return state;
        case PostActions.UPDATE_POST_SUCCESS:
            return state;
        default:
            return state;
    }
};
