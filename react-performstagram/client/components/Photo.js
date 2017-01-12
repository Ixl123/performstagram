import React, {Component} from 'react';
import {Link} from 'react-router';
import CSSTansitionGroup from 'react-addons-css-transition-group';
class Photo extends Component {
    componentWillMount() {}
    render() {
        const {post, i, comments} = this.props;

        return (
            <figure className='grid-figure'>
                {post !== undefined && comments !== undefined
                    ? (
                        <div className="grid-photo-wrap">
                            <Link to={`/view/${post.code}`}>
                                <img src={post.display_src} alt={post.caption} className='grid-photo'/>
                            </Link>
                            <CSSTansitionGroup
                                transitionName='like'
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
                                <span key={post.likes} className="likes-heart">
                                    {post.likes}
                                </span>
                            </CSSTansitionGroup>
                            <figcaption>
                                <p>{post.caption}</p>
                                <div className="control-buttons">
                                    <button
                                        onClick={this
                                        .props
                                        .updatePost
                                        .bind(null, i, post)}className="like">&hearts; {post.likes}</button>
                                    <Link className='button' to={`/view/${post.code}`}>
                                        <span className="comment-count">

                                            <span className="speech-bubble"></span>
                                            &nbsp; {this
                                                .props
                                                .comments
                                                .map((commentsObject) => {
                                                    if (commentsObject.code === post.code) {
                                                        return Object
                                                            .keys(commentsObject)
                                                            .length - 1
                                                    }

                                                })
}
                                        </span>

                                    </Link>
                                </div>
                            </figcaption>
                        </div>
                    )
                    : null}

            </figure>
        );
    }
}

export default Photo;