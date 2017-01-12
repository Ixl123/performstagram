import React, {Component} from 'react';
import Photo from './Photo';
import AddPhoto from './AddPhoto'

class PhotoGrid extends Component {

    componentWillMount() {
        this
            .props
            .loadPosts();
        this
            .props
            .loadComments();
    }
    render() {

        return (
            <div>
                <div className="aligner">
                    <AddPhoto {...this.props} className="align-center"></AddPhoto>
                </div>
                <div className='photo-grid'>

                    {this
                        .props
                        .posts
                        .map((post, i) => <Photo {...this.props} key={i} i={i} post={post}/>)}

                </div>
            </div>
        );
    }
}

export default PhotoGrid;