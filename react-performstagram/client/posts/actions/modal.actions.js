import * as actionTypes from '../types/modal.types';

/**
 * MODAL
 */
export const openModal = () => {
    return {type: actionTypes.OPEN_MODAL, modalIsOpen: true};
}
export const closeModal = () => {
    return {type: actionTypes.CLOSE_MODAL, modalIsOpen: false};
}
