import React, {Component} from 'react';
import Photo from './Photo';
import Comments from './Comments';

class Single extends Component {
    componentWillMount() {
        this
            .props
            .actions
            .postActions
            .loadPosts();
        this
            .props
            .actions
            .commentActions
            .loadComments()
    }

    componentWillUnmount() {
        this
            .props
            .actions
            .postActions
            .unloadPosts();
        this
            .props
            .actions
            .commentActions
            .unloadComments()
    }

    render() {
        const {postId} = this.props.params;

        const i = this
            .props
            .posts
            .findIndex((post) => post.code === postId);
        const post = this.props.posts[i];

        let postComments;
        this
            .props
            .comments
            .map((item) => {
                if (item.code === postId) {
                    postComments = item;
                }
            })
        return (
            <div className='single-photo'>
                <Photo i={i} post={post} {...this.props}/>
                <Comments postComments={postComments} {...this.props}/>
            </div>
        );
    }
}

export default Single;