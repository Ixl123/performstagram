import {Action, ActionReducer} from '@ngrx/store';
import Modal from './Modal';
import {ModalActions} from './modal.actions';

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
            debugger;
            return {
                ...state,
                acceptedFiles: payload.acceptedFile
            }
        default:
            return state;
    }
};
