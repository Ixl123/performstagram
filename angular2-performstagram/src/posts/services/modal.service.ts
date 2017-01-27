import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import Modal from '../Modal';
import {ModalActions} from '../modal.actions';
import {AuthService} from '../../auth/auth.module';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class ModalService {
    modal$ : Observable < Modal >;

    constructor(private store : Store < any >, private actions : ModalActions) {

        this.modal$ = store.select('modal')as Observable < Modal >;
    }

    openModal(modalIsOpen : boolean) : void {
        this
            .store
            .dispatch(this.actions.openModal(modalIsOpen));
    }

    closeModal(modalIsOpen : boolean) : void {
        this
            .store
            .dispatch(this.actions.closeModal(modalIsOpen));
    }
    addFile(acceptedFile : {
        preview: string
    }) : void {
        this
            .store
            .dispatch(this.actions.addFile(acceptedFile));
    }
    getFile() : Observable < string > {
        return this
            .modal$
            .map(v => v.acceptedFiles.preview);
    }
}