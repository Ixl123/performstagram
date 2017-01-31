import {firebaseAuth, firebaseApp, firebaseDb} from '../../firebase';
import * as actionTypes from '../types/post.types.js';
import {postList} from '../../data/postList';

/**
 * POSTS
 */
export const loadPosts = () => {
    return (dispatch) => {
        postList.path = 'posts';
        postList._actions = {
            onAdd: createPostSuccess,
            onLoad: loadPostsSuccess,
            onChange: updatePostSuccess
        }
        postList.subscribe(dispatch);
    };
}
export const loadPostsSuccess = (posts) => {

    return {type: actionTypes.LOAD_POSTS_SUCCESS, payload: posts};
}
export const createPost = (newPost) => {
    // get file reference
    const file = newPost.file;

    return (dispatch) => {
        // First dispatch: the app state is updated to inform that the API call is
        // starting.
        dispatch(uploadFileRequest())

        // get storage reference
        const storageRef = firebaseApp
            .storage()
            .ref('Fotos/' + newPost.id);
        // upload
        let uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', (snapshot) => {
            let percenTageUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        }, (error) => {
            dispatch(uploadFileError);
        }, () => {

            var downloadURL = uploadTask.snapshot.downloadURL;
            postList
                .push({caption: newPost.caption, display_src: downloadURL, likes: 0, id: newPost.id})
                .catch((error) => dispatch(createPostError(error)));
        })

    };

}
export const createPostError = (error) => {

    return {type: actionTypes.CREATE_POST_ERROR, payload: error};
}
export const createPostSuccess = (post) => {

    return {type: actionTypes.CREATE_POST_SUCCESS, payload: post};
}
/**
 * UPDATE POST
 */
export const updatePostSuccess = (post) => {
    return {type: actionTypes.UPDATE_POST_SUCCESS, payload: post};
}
export const updatePostError = (error) => {
    console.error(error);
    return {type: actionTypes.UPDATE_POST_ERROR, payload: error}
}
export const updatePost = (index, post) => {
    return (dispatch) => {
        post.likes = post.likes + 1;
        const newPost = {
            caption: post.caption,
            display_src: post.display_src,
            likes: post.likes
        }
        postList
            .update(post.code, newPost)
            .catch((error) => dispatch(updatePostError(error)));

    };
}

export const unloadPosts = () => {
    postList.unsubscribe();
    return {type: actionTypes.UNLOAD_POSTS_SUCCESS};
}
/**
 * ON DROP FILE
 */

export const onDrop = (acceptedFiles) => {

    return {type: actionTypes.ADD_FILE, acceptedFile: acceptedFiles[0]};
}
/**
 * UPLOAD FILE FOR POST
 */
export const uploadFileRequest = () => {
    return {type: actionTypes.UPLOAD_FILE_REQUEST}
}
export const uploadFileError = (error) => {
    return {type: actionTypes.UPLOAD_FILE_ERROR, payload: error}
}
