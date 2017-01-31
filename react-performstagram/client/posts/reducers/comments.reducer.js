import {
    CREATE_COMMENTS_SUCCESS,
    LOAD_COMMENTS_SUCCESS,
    REMOVE_COMMENTS_SUCCESS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    CREATE_COMMENTS_REQUEST,
    UPDATE_COMMENTS_SUCCESS
} from '../types/comment.types'
const comments = (state = [], action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return [
                ...state, {
                    user: action.author,
                    text: action.comment
                }
            ];
        case REMOVE_COMMENT:
            return [
                ...state.slice(0, action.i),
                ...state.slice(action.i + 1) // selection till last element from index plus one since we want to delete the index
            ]
        case LOAD_COMMENTS_SUCCESS:
            return action.payload;
        case CREATE_COMMENTS_SUCCESS:
            return [
                action.payload, ...state
            ]
        case UPDATE_COMMENTS_SUCCESS:
            return state.map((comment, index) => {
                if (comment.code !== action.payload.code) {
                    // This isn't the item we care about - keep it as-is
                    return comment;
                }
                // Otherwise, this is the one we want - return an updated value
                return action.payload

            });
        case REMOVE_COMMENTS_SUCCESS:
            return state.filter((comment, index) => {
                return comment.code !== action.payload.code
            });
        default:
            return state;
    }
}

// const comments = (state = [], action) => {     if (typeof action.postId !==
// 'undefined')         return {             ...state, [action.postId]:
// postComments(state[action.postId], action)         } return state; }

export default comments;