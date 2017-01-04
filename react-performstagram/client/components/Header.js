import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div className="header">
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
            </div>
        );
    }
}

export default Header;