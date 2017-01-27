export default class Modal {
    modalIsOpen : boolean;
    acceptedFiles : {
        preview: string
    };
    constructor(modalIsOpen : boolean, acceptedFiles : {
        preview: string
    }) {
        this.modalIsOpen = modalIsOpen;
        this.acceptedFiles = acceptedFiles;
    }
}
