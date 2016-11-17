import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actionCreator';
import Main from './main';

export const mapStateToPros = (state) => {
    return {posts: state.posts, comments: state.comments};
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreator, dispatch);
}

const App = connect(mapStateToPros, mapDispatchToProps)(Main);

export default App;