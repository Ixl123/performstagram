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
    comments$ : Observable < any >;

    constructor(private store : Store < any >, public auth : AuthService, af : AngularFire, public actions : CommentActions) {
        store.dispatch(this.actions.loadComments());
        this.comments$ = store.select('comments');
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

    getComments(postId : string) {
        // find the object in the Observable Array which holds the comments for the
        // specific postId
        const commentsForSelectedPost$ = this
            .comments$
            .map((comment) => {
                return comment.filter((commentsForSelectedPost) => {
                    return commentsForSelectedPost.code === postId;
                })
            });
        // extract the comments from the Observable. structure of the comments
        // {key1:{author:"test", comment:"test"}, key2:{author:"test2",
        // comment:"test2"},... code:"mkasdmkam"} -> the code references to the postId.
        const commentsCleared$ = commentsForSelectedPost$.map((commentsArrayCleared) => {
            return commentsArrayCleared.map(commentsArray => {
                return Object
                    .keys(commentsArray)
                    .map((key) => {
                        if (key.startsWith('-')) {
                            return commentsArray[key];
                        }
                    })
            })

        });
        return commentsCleared$;

    }
}
