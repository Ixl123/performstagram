import firebase from 'firebase';
import {firebaseAuth, firebaseApp, firebaseDb} from '../components/firebase';
import * as actionTypes from './actionTypes';
import {postList} from '../data/postList';
import {commentList} from '../data/commentList';

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
            console.log(error);
        }, () => {

            var downloadURL = uploadTask.snapshot.downloadURL;
            postList
                .push({caption: newPost.caption, title: newPost.title, display_src: downloadURL, likes: 0, id: newPost.id})
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
            id: post.id,
            likes: post.likes,
            title: post.title

        }
        postList
            .update(post.code, newPost)
            .catch((error) => dispatch(updatePostError(error)));

    };
}
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
/**
 * COMMENTS
 */
export const loadComments = () => {
    return (dispatch) => {
        debugger;

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
export const addComment = (postId, author, comment) => {
    return (dispatch) => {
        post.likes = post.likes + 1;
        const newPost = {
            caption: post.caption,
            display_src: post.display_src,
            id: post.id,
            likes: post.likes,
            title: post.title
        }
        commentList.path = 'comments';

        commentList
            .update(post.code, newPost)
            .catch((error) => dispatch(updatePostError(error)));

    };

};
export const removeComment = (postId, i) => ({type: 'REMOVE_COMMENT', i, postId});

export const loadCommentSuccess = (comments) => {

    return {type: actionTypes.LOAD_COMMENTS_SUCCESS, payload: comments};
}
export const createCommentSuccess = (comments) => {

    return {type: actionTypes.CREATE_COMMENTS_SUCCESS, payload: comments}
}
export const removeCommentSuccess = () => {}

/**
 * AUTH
 */
function authenticate(provider) {
    return (dispatch) => {
        firebaseAuth
            .signInWithPopup(provider)
            .then((result) => dispatch(signInSuccess(result.user)))
            .catch((error) => dispatch(signInError(error)));
    };
}
export const initAuth = (user) => {
    return {type: actionTypes.INIT_AUTH, payload: user};
}
export const signInError = (error) => {
    return {type: actionTypes.SIGN_IN_ERROR, payload: error};
}

export const signInSuccess = (result) => {

    return {type: actionTypes.SIGN_IN_SUCCESS, payload: result};

}

export const signInWithGithub = () => {
    return authenticate(new firebase.auth.GithubAuthProvider());
}

export const signInWithGoogle = () => {
    return authenticate(new firebase.auth.GoogleAuthProvider());
}

export const signInWithTwitter = () => {
    return authenticate(new firebase.auth.TwitterAuthProvider());
}
export const signInWithTestAccount = () => {
    return (dispatch) => {
        firebaseAuth
            .signInWithEmailAndPassword('default@default.de', 'default')
            .then((result) => dispatch(signInSuccess(result)))
            .catch((error) => dispatch(signInError(error)));
    };
}
export const signOut = () => {
    return (dispatch) => {
        firebaseAuth
            .signOut()
            .then(() => dispatch(signOutSuccess()));
    };
}

export const signOutSuccess = () => {
    return {type: actionTypes.SIGN_OUT_SUCCESS};
}

/**
 * FILE UPLOAD
 */

const uploadFile = (file, fileName) => {
    // get storage reference
    const storageRef = storafirebaseApp
        .storage()
        .ref('Fotos/' + newPost.title);
    // upload
    let uploadTask = storageRef.put(file);

}
export const uploadFileRequest = () => {
    return {type: actionTypes.UPLOAD_FILE_REQUEST}
}
export const uploadFileError = (error) => {
    return {type: actionTypes.UPLOAD_FILE_ERROR}
}

export const openModal = () => {
    return {type: actionTypes.OPEN_MODAL, modalIsOpen: true};
}
export const closeModal = () => {
    return {type: actionTypes.CLOSE_MODAL, modalIsOpen: false};
}

export const onDrop = (acceptedFiles) => {

    return {type: actionTypes.ADD_FILE, acceptedFile: acceptedFiles[0]};
}