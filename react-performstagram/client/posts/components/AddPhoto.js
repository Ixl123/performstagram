import React, {Component} from 'react';
import Modal from 'react-modal';
var Dropzone = require('react-dropzone');
const uuidV4 = require('uuid/v4');
import {firebaseAuth} from '../../firebase'
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

    handleSubmit(e) {

        e.preventDefault();

        const file = this.props.modal.acceptedFile;
        this
            .props
            .actions
            .modalActions
            .closeModal();
        const author = this.props.auth.displayName;
        const caption = this.refs.caption.value;
        const id = uuidV4()

        const newPost = {
            author,
            caption,
            id,
            file
        }

        this
            .props
            .actions
            .postActions
            .createPost(newPost)
        // reset form
        this
            .refs
            .uploadForm
            .reset();

    }
    render() {

        return (
            <div className="photo-grid__button_add">
                <button onClick={this.props.actions.modalActions.openModal} className="like">+ Add image</button>
                <Modal
                    isOpen={this.props.modal.modalIsOpen}
                    onRequestClose={this.props.actions.modalActions.closeModal}
                    style={customStyles}
                    contentLabel="Upload Image Modal">
                    <h2 ref="subtitle">Upload a image</h2>
                    <Dropzone
                        onDrop={this.props.actions.postActions.onDrop}
                        multiple={false}
                        accept={'image/*'}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                        {this.props.modal.acceptedFile
                            ? <img src={this.props.modal.acceptedFile.preview}/>
                            : null}
                    </Dropzone>
                    <form
                        ref='uploadForm'
                        className='comment-form'
                        onSubmit={this
                        .handleSubmit
                        .bind(this)}>
                        <input type='text' className='caption' ref='caption' placeholder='caption'/>
                        <div className="modal-grid__button">
                            <button className="modal-grid__button_submit">
                                <input type='submit' value="Upload"/></button>
                        </div>
                    </form>

                </Modal>
            </div>
        );
    }
}

export default AddPhoto;