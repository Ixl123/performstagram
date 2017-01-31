import firebase from 'firebase';
import {firebaseAuth, firebaseApp, firebaseDb} from '../../firebase';
import * as actionTypes from '../types/comment.types';
import {commentList} from '../../data/commentList';

/**
 * COMMENTS
 */
export const createCommentRequest = () => {
    return {type: actionTypes.CREATE_COMMENTS_REQUEST}
}
export const createComment = (newComment) => {
    // get file reference
    return (dispatch) => {
        // First dispatch: the app state is updated to inform that the API call is
        // starting.
        dispatch(createCommentRequest())

        commentList.path = `comments/${newComment.postId}`;
        commentList
            .push({author: newComment.author, comment: newComment.comment})
            .catch((error) => dispatch(createCommentError(error)));

        //check wheter a child for the comment id exist

    };
}

export const loadComments = () => {
    return (dispatch) => {
        commentList.path = 'comments';
        commentList._actions = {
            onAdd: createCommentSuccess,
            onLoad: loadCommentSuccess,
            onChange: updateCommentSuccess,
            onRemove: removeCommentSuccess
        }
        commentList.subscribe(dispatch);
    };
}
export const updateCommentSuccess = (comment) => {
    return {type: actionTypes.UPDATE_COMMENTS_SUCCESS, payload: comment};
}

export const removeComment = (commentPath) => {
    return (dispatch) => {
        commentList._path = 'comments';
        commentList
            .remove(commentPath)
            .catch((error) => dispatch(deleteTaskError(error)));
    };
}

export const loadCommentSuccess = (comments) => {

    return {type: actionTypes.LOAD_COMMENTS_SUCCESS, payload: comments};
}

export const unloadComments = () => {
    commentList.unsubscribe();
    return {type: actionTypes.UNLOAD_COMMENTS_SUCCESS};
}
export const createCommentSuccess = (comments) => {

    return {type: actionTypes.CREATE_COMMENTS_SUCCESS, payload: comments}
}
export const removeCommentSuccess = (comments) => {

    return {type: actionTypes.REMOVE_COMMENTS_SUCCESS, payload: comments}
}