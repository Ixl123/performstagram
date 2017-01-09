import React, {Component} from 'react';
import Modal from 'react-modal';
var Dropzone = require('react-dropzone');

const appElement = document.getElementById('root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class AddPhoto extends Component {

    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);
    }
    render() {

        return (
            <div className="photo-grid__button_add">
                <button onClick={this.props.openModal} className="like">+ Add image</button>
                <Modal
                    isOpen={this.props.modal.modalIsOpen}
                    onRequestClose={this.props.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <h2 ref="subtitle">Upload a image</h2>
                    <Dropzone onDrop={this.onDrop}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                    <form ref='commentForm' className='comment-form'>
                        <input type='text' ref='author' placeholder='author'/>
                        <input type='text' ref='description' placeholder='description'/>
                        <input type='submit' hidden/>
                    </form>
                    <button onClick={this.props.closeModal}>close</button>
                    <button onClick={this.props.uploadImage}>Submit</button>
                </Modal>
            </div>
        );
    }
}

export default AddPhoto;