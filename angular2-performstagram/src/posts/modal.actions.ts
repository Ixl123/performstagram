import {Action} from '@ngrx/store';
import {Injectable} from '@angular/core';
export class ModalActions {

    static OPEN_MODAL = 'OPEN_MODAL';
    static CLOSE_MODAL = 'CLOSE_MODAL';
    static ADD_FILE = 'ADD_FILE';
    // ===================================  CREATE
    // -----------------------------------

    openModal(modalIsOpen : boolean) : Action {
        return {type: ModalActions.OPEN_MODAL, payload: {
                modalIsOpen
            }};
    }

    closeModal(modalIsOpen : boolean) : Action {
        return {type: ModalActions.CLOSE_MODAL, payload: modalIsOpen};
    }

    addFile(acceptedFile : {
        preview: string
    }) : Action {
        return {type: ModalActions.ADD_FILE, payload: {
                acceptedFile
            }};
    }
}
