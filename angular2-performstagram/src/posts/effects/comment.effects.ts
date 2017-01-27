import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CommentActions} from '../actions/comment.actions';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import Comments from '../datatypes/comments';
import Comment from '../datatypes/comment';

@Injectable()
export class CommentEffects {
    constructor(private actions$ : Actions, private firebase : AngularFire, private store$ : Store < any >, public commentActions : CommentActions) {}

    @Effect()
    loadComments$ = this
        .actions$
        .ofType(CommentActions.LOAD_COMMENTS)
        .switchMap(() => this.firebase.database.list('comments'))
        .map((fetchedComments) => this.commentActions.loadCommentsSuccess(new Comments(fetchedComments.map((commentsForSpecificPost) => {
            // same structure as react perfomstagram store
            commentsForSpecificPost.code = commentsForSpecificPost.$key;
            delete commentsForSpecificPost.$key;
            return commentsForSpecificPost;
        }))))
        .catch(error => Observable.of(this.commentActions.loadCommentsError(error)));

    @Effect()
    createComment$ = this
        .actions$
        .ofType(CommentActions.CREATE_COMMENT)
        .switchMap(({payload}) => this.firebase.database.list(`comments/${payload.postId}`).push(payload.comment).then((pushedComment) => {
            return this
                .commentActions
                .createCommentSuccess(payload.comment, payload.postId, pushedComment.key);
        }))
        .catch(error => Observable.of(this.commentActions.createCommentError(error)));
    @Effect()
    removeComment$ = this
        .actions$
        .ofType(CommentActions.REMOVE_COMMENT)
        .switchMap(({payload}) => this.firebase.database.object(`comments/${payload.postId}/${payload.key}`).remove().then(() => {
            return this
                .commentActions
                .removeCommentSuccess(payload.postId, payload.key);
        }))
        .catch(error => Observable.of(this.commentActions.removeCommentError(error)));
}