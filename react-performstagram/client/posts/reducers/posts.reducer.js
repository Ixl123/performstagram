import {CREATE_POST_SUCCESS, LOAD_POSTS_SUCCESS, UPDATE_POST_SUCCESS} from '../types/post.types'

const posts = (state = [], action) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return [
        action.payload, ...state
      ];
    case LOAD_POSTS_SUCCESS:
      return action
        .payload
        .reverse();
    case UPDATE_POST_SUCCESS:
      return state.map((posts, index) => {
        if (posts.code !== action.payload.code) {
          // This isn't the item we care about - keep it as-is
          return posts;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
          ...posts,
          ...action.payload
        };
      });
    default:
      return state;
  }

}

export default posts;