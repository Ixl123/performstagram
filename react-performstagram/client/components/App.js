import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actionCreator';
import Main from './Main';

export const mapStateToPros = (state) => {
    console.log(state);
    debugger;
    return {posts: state.posts, comments: state.comments, auth: state.auth, modal: state.modal};
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreator, dispatch);
}

const App = connect(mapStateToPros, mapDispatchToProps)(Main);

export default App;