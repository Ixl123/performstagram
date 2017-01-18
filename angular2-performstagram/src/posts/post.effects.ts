import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {PostActions} from './post.actions';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import Posts from './posts';
import Post from './post';

@Injectable()
export class PostEffects {
    constructor(private actions$ : Actions, private firebase : AngularFire, private store$ : Store < any >, public postActions : PostActions) {

        console.log('EFFECTS CREATE');
    }

    @Effect()
    loadPosts$ = this
        .actions$
        .ofType(PostActions.LOAD_POSTS)
        .switchMap(() => this.firebase.database.list('posts'))
        .map((fetchedPosts) => this.postActions.loadPostsSuccess(new Posts(fetchedPosts.map((post) => {
            return new Post(post.caption, post.id, post.title, post.display_src, post.likes, post.$key)
        }).reverse())))
        .catch(error => Observable.of(this.postActions.loadPostsError(error)));

}
