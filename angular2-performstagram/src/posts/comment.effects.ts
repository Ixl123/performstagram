import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CommentActions} from './comment.actions';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import Comments from './comments';
import Comment from './comment';

@Injectable()
export class CommentEffects {
    constructor(private actions$ : Actions, private firebase : AngularFire, private store$ : Store < any >, public commentActions : CommentActions) {

        console.log('CREATE COMMENT EFFECTS');
    }

    @Effect()
    loadComments$ = this
        .actions$
        .ofType(CommentActions.LOAD_COMMENTS)
        .switchMap(() => this.firebase.database.list('comments'))
        .map((fetchedComments) => this.commentActions.loadCommentsSuccess(new Comments(fetchedComments.map((comment) => {
            return new Comment(comment.author, comment.comment)
        }))))
        .catch(error => Observable.of(this.commentActions.loadCommentsError(error)));
}