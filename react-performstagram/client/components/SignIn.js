import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actionCreator} from '../actions/actionCreator';
class SignIn extends Component {
    constructor() {
        super()

    }
    render() {

        const signInWithGithub = () => {}
        const signInWithGoogle = () => {}
        const signInWithTwitter = () => {}

        return (
            <div className="g-row sign-in">
                <div className="g-col">
                    <h1 className="sign-in__heading">Sign in</h1>
                    <button
                        className="btn sign-in__button"
                        onClick={signInWithGithub}
                        type="button">GitHub</button>
                    <button
                        className="btn sign-in__button"
                        onClick={signInWithGoogle}
                        type="button">Google</button>
                    <button
                        className="btn sign-in__button"
                        onClick={signInWithTwitter}
                        type="button">Twitter</button>
                </div>
            </div>
        )
    }
}
export default connect(null, actionCreator)(SignIn);