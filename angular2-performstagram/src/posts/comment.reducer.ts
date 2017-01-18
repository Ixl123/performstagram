import {Action, ActionReducer} from '@ngrx/store';
import Comments from './comments';
import {CommentActions} from './comment.actions';

export const commentReducer : ActionReducer < Comments > = (state, {payload, type} : Action) => {
    debugger;
    console.log(type);

    debugger;
    switch (type) {
        case CommentActions.LOAD_COMMENTS_SUCCESS:
            return payload;
        case CommentActions.LOAD_COMMENTS_SUCCESS:
            return state;
        case CommentActions.UPDATE_COMMENT_SUCCESS:
            return state;
        default:
            return state;
    }
};
