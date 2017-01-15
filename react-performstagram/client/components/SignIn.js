import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actionCreator} from '../actions/actionCreator';
class SignIn extends Component {

    render() {

        return (
            <div className="sign-in_flex-container">
                <div className="sign-in_flex-item-account">
                    <button
                        className="btn sign-in__button"
                        onClick={this.props.signInWithGithub}
                        type="button">
                        <i className="fa fa-github fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with GitHub</button>
                    <button
                        className="btn sign-in__button"
                        onClick={this.props.signInWithGoogle}
                        type="button">
                        <i className="fa fa-google fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with Google</button>
                    <button
                        className="btn sign-in__button"
                        onClick={this.props.signInWithTestAccount}
                        type="button">
                        <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with demo account</button>
                </div>
            </div>
        )
    }
}
export default connect(null, actionCreator)(SignIn);