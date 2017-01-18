import {Action} from '@ngrx/store';
import Comments from './comments';
import Comment from './comment';
import {Injectable} from '@angular/core';
export class CommentActions {

    static CREATE_COMMENT = 'CREATE_COMMENT';
    static CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';
    static CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';

    static LOAD_COMMENTS = 'LOAD_COMMENTS';
    static LOAD_COMMENTS_ERROR = 'LOAD_COMMENTS_ERROR';
    static LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';

    static UPDATE_COMMENT = 'UPDATE_COMMENT';
    static UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR';
    static UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';

    static DELTE_COMMENT = 'DELTE_COMMENT';
    static DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';
    static DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
    // ===================================  CREATE
    // -----------------------------------

    createComment(comment : Comment) : Action {
        return {type: CommentActions.CREATE_COMMENT, payload: {
                comment
            }};
    }

    createCommentFailed(error : any) : Action {
        return {type: CommentActions.CREATE_COMMENT_ERROR, payload: error};
    }

    createCommentSuccess(comment : Comment) : Action {
        return {type: CommentActions.CREATE_COMMENT_SUCCESS, payload: {
                comment
            }};
    }

    // ===================================  LOAD -----------------------------------

    loadComments() : Action {
        return {type: CommentActions.LOAD_COMMENTS};
    }

    loadCommentsError(error : any) : Action {
        return {type: CommentActions.LOAD_COMMENTS_ERROR, payload: error};
    }

    loadCommentsSuccess(comments : Comments) : Action {
        console.log(comments);
        debugger;
        return {type: CommentActions.LOAD_COMMENTS_SUCCESS, payload: comments};
    }

    // ===================================  UPDATE
    // -----------------------------------

    updateComment(comment : Comment) : Action {
        return {type: CommentActions.UPDATE_COMMENT, payload: {
                comment
            }};
    }

    updateCommentError(error : any) : Action {
        return {type: CommentActions.UPDATE_COMMENT_ERROR, payload: error};
    }

    updateCommentSuccess(comment : Comment) : Action {
        return {type: CommentActions.UPDATE_COMMENT_SUCCESS, payload: {
                comment
            }};
    }
    // ===================================  Delete
    // -----------------------------------
    deleteComment(comment : Comment) : Action {
        return {type: CommentActions.UPDATE_COMMENT, payload: {
                comment
            }};
    }

    deleteCommentError(error : any) : Action {
        return {type: CommentActions.UPDATE_COMMENT_ERROR, payload: error};
    }

    deleteCommentSuccess(comment : Comment) : Action {
        return {type: CommentActions.UPDATE_COMMENT_SUCCESS, payload: {
                comment
            }};
    }
}