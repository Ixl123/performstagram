import React, {Component} from 'react';

class Header extends Component {

    render() {
        authenticated = this.props.authenticated;
        signout = this.props.signOut;
        return (
            <header className="header">
                <div className="g-row">
                    <div className="g-col">
                        <h1 className="header__title">Todo React Redux</h1>
                        <ul className="header__actions">
                            {authenticated
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
        );
    }
}

export default Header;