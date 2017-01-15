import {OPEN_MODAL, CLOSE_MODAL, ADD_FILE} from '../actions/actionTypes'
const modal = (state = [], action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                modalIsOpen: action.modalIsOpen
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalIsOpen: action.modalIsOpen,
                acceptedFile: null
            }
        case 'ADD_FILE':
            return {
                ...state,
                acceptedFile: action.acceptedFile
            }
        default:

            return state;
    }

}

export default modal;