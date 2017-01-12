import React, {Component} from 'react';

class Comments extends Component {
    renderComment(comment, i) {

        return (
            <div className='comment' key={i}>
                <p>
                    <strong>{comment['author']}</strong>
                    {typeof comment === 'object'
                        ? comment['comment']
                        : false}
                    <button
                        className='remove-comment'
                        onClick={this
                        .props
                        .removeComment
                        .bind(null, this.props.params.postId, i)}>&times;</button>
                </p>
            </div>
        )
    }
    handleSubmit(e) {
        e.preventDefault();

        const {postId} = this.props.params;
        const author = this.props.auth.displayName;
        const comment = this.refs.comment.value;
        const newComment = {
            postId,
            author,
            comment
        }
        this
            .props
            .createComment(newComment);
        this
            .refs
            .commentForm
            .reset();

    }
    render() {

        return (
            <div className='comments'>
                {this.props.postComments !== undefined
                    ? Object
                        .keys(this.props.postComments)
                        .map((key, i) => {

                            if (key['code'] !== this.props.params.postId) {
                                return this.renderComment(this.props.postComments[key], i)
                            }
                        })
                    : null}

                <form
                    ref='commentForm'
                    className='comment-form'
                    onSubmit={this
                    .handleSubmit
                    .bind(this)}>
                    <input type='text' ref='author' value={this.props.auth.displayName}/>
                    <input type='text' ref='comment' placeholder='comment'/>
                    <input type='submit' hidden/>
                </form>
            </div>
        );
    }
}

export default Comments;
