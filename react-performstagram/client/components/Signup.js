import React, {Component} from 'react';
import {firebase, helpers} from 'redux-react-firebase';
import {connect} from 'react-redux';
const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers

@firebase()
@connect(({firebase}) => ({
    authError: pathToJS(firebase, 'authError')
}))
class Signup extends Component {
    render() {
        const {firebase, authError} = this.props;
        const handleSignup = () => {
            const {email, password, name} = this.refs
            const credentials = {
                email: email.value,
                password: password.value
            }
            firebase.createUser(credentials, {name: name.value})
        }
        const error = (authError)
            ? authError.toString()
            : ''
        return (
            <div>
                <h1>Signup</h1>
                <input type='email' name='email' placeholder='Email' ref='email'/>
                <input type='password' name='password' placeholder='Password' ref='password'/>
                <input type='text' name='text' placeholder='Text' ref='text'/>
                <button onClick={handleSignup}></button>
            </div>
        );
    }
}

export default Signup;