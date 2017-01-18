import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import Comments from '../Comments';
import Comment from '../Comment';
import {CommentActions} from '../comment.actions';
import {AuthService} from '../../auth/auth.module';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
@Injectable()
export class CommentService {
    comments$ : Observable < Comments[] >;

    constructor(private store : Store < any >, public auth : AuthService, af : AngularFire, public actions : CommentActions) {
        store.dispatch(this.actions.loadComments());
        this.comments$ = store.select('comments')as Observable < Comments[] >;
    }

    createCommment(comment : Comment) : void {
        this
            .store
            .dispatch(this.actions.createComment(comment));
    }

    updateComment(comment : Comment) : void {
        this
            .store
            .dispatch(this.actions.updateComment(comment));
    }
    deletComment(comment : Comment) : void {
        this
            .store
            .dispatch(this.actions.deleteComment(comment));
    }
}
