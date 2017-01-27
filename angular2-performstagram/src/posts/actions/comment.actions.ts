import {Action} from '@ngrx/store';
import Comments from '../datatypes/comments';
import Comment from '../datatypes/comment';
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

    static REMOVE_COMMENT = 'REMOVE_COMMENT';
    static REMOVE_COMMENT_ERROR = 'REMOVE_COMMENT_ERROR';
    static REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
    // ===================================  CREATE
    // -----------------------------------

    createComment(comment : Comment, postId) : Action {
        return {
            type: CommentActions.CREATE_COMMENT,
            payload: {
                comment,
                postId
            }
        };
    }

    createCommentError(error : any) : Action {
        return {type: CommentActions.CREATE_COMMENT_ERROR, payload: error};
    }

    createCommentSuccess(comment : Comment, postId : string, key : string) : Action {
        return {
            type: CommentActions.CREATE_COMMENT_SUCCESS,
            payload: {
                comment,
                postId,
                key
            }
        };
    }

    // ===================================  LOAD -----------------------------------

    loadComments() : Action {
        return {type: CommentActions.LOAD_COMMENTS};
    }

    loadCommentsError(error : any) : Action {
        return {type: CommentActions.LOAD_COMMENTS_ERROR, payload: error};
    }

    loadCommentsSuccess(comments : Comments) : Action {
        return {type: CommentActions.LOAD_COMMENTS_SUCCESS, payload: comments.comments};
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
    removeComment(postId : string, key : string) : Action {
        return {
            type: CommentActions.REMOVE_COMMENT,
            payload: {
                key,
                postId
            }
        };
    }

    removeCommentError(error : any) : Action {
        return {type: CommentActions.REMOVE_COMMENT_ERROR, payload: error};
    }

    removeCommentSuccess(postId : string, key : string) : Action {
        return {
            type: CommentActions.REMOVE_COMMENT_SUCCESS,
            payload: {
                postId,
                key
            }
        };
    }
}