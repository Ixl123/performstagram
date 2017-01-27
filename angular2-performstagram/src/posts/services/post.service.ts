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
    posts$ : Observable < Array < Post > >;

    constructor(private store : Store < any >, public auth : AuthService, af : AngularFire, public actions : PostActions) {
        store.dispatch(this.actions.loadPosts());
        this.posts$ = store.select('posts')as Observable < Array < Post > >;
    }

    createPost(post : Object) : void {
        debugger;
        this
            .store
            .dispatch(this.actions.createPost(post));
    }

    updatePost(post : Post, i : number) : void {
        // new Post with incremented likes

        const newPost = new Post(post.caption, post.display_src, post.likes += 1, post.code);
        this
            .store
            .dispatch(this.actions.updatePost(newPost));
    }
    getPost(postId : string) : Observable < Array < Post > > {
        return this
            .posts$
            .map((posts) => {
                return posts.filter((post) => {
                    return post.code === postId
                })
            })
    }
}
