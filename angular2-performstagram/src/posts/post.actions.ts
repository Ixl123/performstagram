import {Action} from '@ngrx/store';
import Posts from './posts';
import Post from './post';
import {Injectable} from '@angular/core';
export class PostActions {

    static CREATE_POST = 'CREATE_POST';
    static CREATE_POST_ERROR = 'CREATE_POST_ERROR';

    static CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
    static LOAD_POSTS = 'LOAD_POSTS';
    static LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR';

    static LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';

    static UPDATE_POST = 'UPDATE_POST';
    static UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';

    static UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
    // ===================================  CREATE
    // -----------------------------------

    createPost(post : Post) : Action {
        return {type: PostActions.CREATE_POST, payload: {
                post
            }};
    }

    createPostFailed(error : any) : Action {
        return {type: PostActions.CREATE_POST_ERROR, payload: error};
    }

    createPostSuccess(post : Post) : Action {
        return {type: PostActions.CREATE_POST_SUCCESS, payload: {
                post
            }};
    }

    // ===================================  LOAD -----------------------------------

    loadPosts() : Action {
        return {type: PostActions.LOAD_POSTS};
    }

    loadPostsError(error : any) : Action {
        return {type: PostActions.LOAD_POSTS_ERROR, payload: error};
    }

    loadPostsSuccess(posts : Posts) : Action {

        return {type: PostActions.LOAD_POSTS_SUCCESS, payload: posts.posts};
    }

    // ===================================  UPDATE
    // -----------------------------------

    updatePost(post : Post) : Action {
        return {type: PostActions.UPDATE_POST, payload: {
                post
            }};
    }

    updatePostError(error : any) : Action {
        return {type: PostActions.UPDATE_POST_ERROR, payload: error};
    }

    updatePostSuccess(post : any) : Action {
        return {type: PostActions.UPDATE_POST_SUCCESS, payload: {
                post
            }};
    }
}
