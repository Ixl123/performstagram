import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Inject} from '@angular/core';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {PostActions} from '../actions/post.actions';
import {FirebaseApp, AngularFire, FirebaseListObservable} from 'angularfire2';
import Posts from '../datatypes/posts';
import Post from '../datatypes/post';

@Injectable()
export class PostEffects {
    firebaseAppStorage : any;
    firebaseAppPostList : FirebaseListObservable < any[] >;
    constructor(private actions$ : Actions, private firebase : AngularFire, private store$ : Store < any >, public postActions : PostActions, @Inject(FirebaseApp)firebaseApp : any) {
        // reference to store
        this.firebaseAppStorage = firebaseApp.storage()
        // reference to angularfire2 database
        this.firebaseAppPostList = this
            .firebase
            .database
            .list('posts');
    }
    // Load Posts
    @Effect()
    loadPosts$ = this
        .actions$
        .ofType(PostActions.LOAD_POSTS)
        .switchMap(() => this.firebaseAppPostList)
        .map((fetchedPosts) => this.postActions.loadPostsSuccess(new Posts(fetchedPosts.map((post) => {
            return new Post(post.caption, post.display_src, post.likes, post.$key)
        }).reverse())))
        .catch(error => Observable.of(this.postActions.loadPostsError(error)));
    // Update Post
    @Effect()
    updatePost$ = this
        .actions$
        .ofType(PostActions.UPDATE_POST)
        .switchMap(({payload}) => this.firebaseAppPostList.update(payload.post.code, payload.post).then(() => {
            return this
                .postActions
                .updatePostSuccess(payload.post);

        }))
        .catch(error => Observable.of(this.postActions.updatePostError(error)));
    // create post
    @Effect()
    createPost$ = this
        .actions$
        .ofType(PostActions.CREATE_POST)
        .switchMap(({payload}) => {
            this
                .postActions
                .uploadFileRequest();
            return this
                .firebaseAppStorage
                .ref(`Fotos/${payload.post.id}`)
                .put(payload.post.file)
                .then((snapshot) => {
                    this
                        .postActions
                        .uploadFileSuccess();
                    let downloadURL = snapshot.downloadURL;
                    return this
                        .firebaseAppPostList
                        .push({caption: payload.post.caption, display_src: downloadURL, likes: 0})
                        .then((databaseSnapshot) => {
                            return this
                                .postActions
                                .createPostSuccess();

                        })
                })
        })
        .catch(error => Observable.of(this.postActions.updatePostError(error)));

}
