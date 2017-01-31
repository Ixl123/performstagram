import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as postActions from './posts/actions/post.actions';
import * as commentActions from './posts/actions/comment.actions';
import * as modalActions from './posts/actions/modal.actions';
import * as authActions from './auth/actions/auth.actions';
import Main from './Main';

export const mapStateToPros = (state) => {
    return {posts: state.posts, comments: state.comments, auth: state.auth, modal: state.modal};
}

export const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            commentActions: bindActionCreators(commentActions, dispatch),
            modalActions: bindActionCreators(modalActions, dispatch),
            postActions: bindActionCreators(postActions, dispatch),
            authActions: bindActionCreators(authActions, dispatch)
        }
    }
}

const App = connect(mapStateToPros, mapDispatchToProps)(Main);

export default App;