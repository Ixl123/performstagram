import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {paths} from '../routes';
import {browserHistory} from 'react-router'
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
                    <div className="header__wrapper">
                        <ul className="header__wrapper_actions">
                            {auth.authenticated
                                ? <li>
                                        <button className="btn" onClick={signOut}>Sign out</button>
                                    </li>
                                : null}
                            <li>
                                <a
                                    className="fa fa-github fa-lg"
                                    href="https://github.com/Ixl123/performstagram"></a>
                            </li>
                        </ul>
                    </div>
                    <div className="g-row">
                        <div className="g-col">
                            <h1>
                                <Link to='/'>Performstagram 3000 React
                                </Link>
                            </h1>

                        </div>
                    </div>
                </header>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

export default Main;