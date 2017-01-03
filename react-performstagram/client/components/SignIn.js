import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actionCreator} from '../actions/actionCreator';
class SignIn extends Component {
    constructor() {
        super()
    }
    render() {

        const signInWithGithub = () => {
            this
                .props
                .signInWithGithub();
        }
        const signInWithGoogle = () => {
            this
                .props
                .signInWithGoogle();
        }
        const signInWithTwitter = () => {
            this
                .props
                .signInWithTwitter();
        }

        return (
            <div className="sign-in_flex-container">
                <div className="sign-in_flex-item-account">
                    <button
                        className="btn sign-in__button"
                        onClick={signInWithGithub}
                        type="button">
                        <i className="fa fa-github fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with GitHub</button>
                    <button
                        className="btn sign-in__button"
                        onClick={signInWithGoogle}
                        type="button">
                        <i className="fa fa-google fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with Google</button>
                    <button
                        className="btn sign-in__button"
                        onClick={signInWithTwitter}
                        type="button">
                        <i className="fa fa-twitter fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with Twitter</button>
                </div>
            </div>
        )
    }
}
export default connect(null, actionCreator)(SignIn);