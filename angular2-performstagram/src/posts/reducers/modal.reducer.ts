import {Action, ActionReducer} from '@ngrx/store';
import Modal from '../datatypes/modal';
import {ModalActions} from '../actions/modal.actions';

export const modalReducer : ActionReducer < Modal > = (state = new Modal(false, null), {payload, type} : Action) => {
    switch (type) {
        case ModalActions.OPEN_MODAL:
            return {
                ...state,
                modalIsOpen: payload.modalIsOpen
            }
        case ModalActions.CLOSE_MODAL:
            return {
                ...state,
                modalIsOpen: payload.modalIsOpen,
                acceptedFile: null
            }
        case ModalActions.ADD_FILE:
            return {
                ...state,
                acceptedFiles: payload.acceptedFile
            }
        default:
            return state;
    }
};
