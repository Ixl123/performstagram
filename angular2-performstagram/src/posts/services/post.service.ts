import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import Posts from '../Posts';
import Post from '../post';
import {PostActions} from '../post.actions';
import {AuthService} from '../../auth/auth.module';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
@Injectable()
export class PostService {
    posts$ : Observable < Posts[] >;

    constructor(private store : Store < any >, public auth : AuthService, af : AngularFire, public actions : PostActions) {
        store.dispatch(this.actions.loadPosts());
        this.posts$ = store.select('posts')as Observable < Posts[] >;
    }

    createPost(post : Post) : void {
        this
            .store
            .dispatch(this.actions.createPost(post));
    }

    updatePost(post : Post) : void {
        this
            .store
            .dispatch(this.actions.updatePost(post));
    }
}
