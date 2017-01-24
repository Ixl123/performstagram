import {Action, ActionReducer} from '@ngrx/store';
import Comment from './comment';
import {CommentActions} from './comment.actions';

export const commentReducer : ActionReducer < Array < any > > = (state = [], {payload, type} : Action) => {

    switch (type) {
        case CommentActions.LOAD_COMMENTS_SUCCESS:
            return payload;
        case CommentActions.CREATE_COMMENT_SUCCESS:
            return state.map(commentsForPosts => {
                if (commentsForPosts.code === payload.postId) {
                    commentsForPosts[payload.key] = payload.comment;
                }
                return commentsForPosts
            });
        case CommentActions.UPDATE_COMMENT_SUCCESS:
            return state;
        case CommentActions.REMOVE_COMMENT_SUCCESS:
            return state.map(commentsForPosts => {
                debugger;

                if (commentsForPosts.code === payload.postId) {
                    delete commentsForPosts[payload.key];
                }
                return commentsForPosts;
            })
        default:
            return state;
    }
};
