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
                modalIsOpen: action.modalIsOpen
            }
        default:

            return state;
    }

}

export default modal;