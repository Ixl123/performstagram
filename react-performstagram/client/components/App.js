import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreator from '../actions/actionCreator';
import Main from './Main';

export const mapStateToPros = (state) => {
    debugger;
    return {posts: state.posts, comments: state.comments};
}

export const mapDispatchToProps = (dispatch) => {
    debugger;
    return bindActionCreators(actionCreator, dispatch);
}

const App = connect(mapStateToPros, mapDispatchToProps)(Main);
console.log(App);
export default App;