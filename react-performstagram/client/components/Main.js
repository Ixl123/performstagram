import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {paths} from '../routes';
import {browserHistory} from 'react-router'
import {Header} from './Header'
class Main extends Component {
    /**
     * gets called whenever the state changes redux method
     */
    componentWillReceiveProps(nextProps) {
        const {auth} = this.props;

        if (auth.authenticated && !nextProps.auth.authenticated) {
            browserHistory.replace(paths.SIGN_IN);
        } else if (!auth.authenticated && nextProps.auth.authenticated) {
            browserHistory.replace(paths.PHOTO_GRID);
        }
    }
    render() {
        const {auth} = this.props;
        const signOut = this.props.signOut;
        return (

            <div>
                <header className="header">
                    <div className="g-row">
                        <div className="g-col">
                            <h1>
                                <Link to='/'>Performstagram 3000
                                </Link>
                            </h1>
                            <ul className="header__actions">
                                {auth.authenticated
                                    ? <li>
                                            <button className="btn" onClick={signOut}>Sign out</button>
                                        </li>
                                    : null}
                                <li>
                                    <a
                                        className="link link--github"
                                        href="https://github.com/r-park/todo-react-redux"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                {React.cloneElement(this.props.children, this.props)}

            </div>
        );
    }
}

export default Main;