import {OPEN_MODAL, CLOSE_MODAL, ADD_FILE, UPLOAD_FILE_ERROR, UPLOAD_FILE_REQUEST} from '../types/modal.types'
const modal = (state = [], action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalIsOpen: action.modalIsOpen
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modalIsOpen: action.modalIsOpen,
                acceptedFile: null
            }
        case ADD_FILE:
            return {
                ...state,
                acceptedFile: action.acceptedFile
            }
        case UPLOAD_FILE_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }

}

export default modal;