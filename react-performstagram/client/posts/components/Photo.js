import React, {Component} from 'react';
import {Link} from 'react-router';
class Photo extends Component {

    render() {
        const {post, i, comments} = this.props;

        return (
            <figure className='grid-figure'>
                {post !== undefined && comments !== undefined
                    ? (
                        <div className="grid-photo-wrap">
                            <Link to={`/single/${post.code}`}>
                                <img src={post.display_src} alt={post.caption} className='grid-photo'/>
                            </Link>

                            <figcaption>
                                <p>{post.caption}</p>
                                <div className="control-buttons">
                                    <button
                                        onClick={() => {
                                        this
                                            .props
                                            .actions
                                            .postActions
                                            .updatePost(i, post)
                                    }}
                                        className="like">&hearts; {post.likes}</button>
                                    <Link className='button' to={`/single/${post.code}`}>
                                        <span className="comment-count">

                                            <span className="speech-bubble"></span>
                                            &nbsp; {this
                                                .props
                                                .comments
                                                .map((commentsObject) => {

                                                    if (commentsObject.code === post.code) {
                                                        return ((Object.keys(commentsObject).length) - 1)
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