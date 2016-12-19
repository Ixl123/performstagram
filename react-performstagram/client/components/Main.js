import React, {Component} from 'react';
import {Link} from 'react-router';
class Main extends Component {

    render() {
        const authenticated = this.props;

        console.log(authenticated);
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

                {React.cloneElement(this.props.children, this.props)}

            </div>
        );
    }
}

export default Main;