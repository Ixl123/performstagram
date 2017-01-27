import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Params, Router, ActivatedRoute} from '@angular/router';
import {PostService} from '../services/post.service';
import {CommentService} from '../services/comment.service';
import {AuthService} from '../../auth/services/auth.service';
import {Store} from '@ngrx/store';
import Post from '../post';
import Comments from '../comments';

import 'rxjs/add/operator/switchMap';

@Component({selector: 'single', template: `
<div class='single-photo'>
                <photo *ngIf="(postService.posts$ | async) && (commentService.comments$ | async)" photo [posts]="post" [comments]="commentService.comments$" ></photo>
                <comments *ngIf="(commentService.comments$ | async) && postId"  [commentsForSelectedPost]="commentsForSelectedPost" [postId]="postId"> </comments>
            </div>
            `})
export class SingleComponent {
    post : Observable < Array < Post > >;
    commentsForSelectedPost : Observable < any >;
    postId : string;
    sub : any;

    constructor(private route : ActivatedRoute, private router : Router, private postService : PostService, private commentService : CommentService, private store : Store < any >, private authService : AuthService) {
        this.sub = this
            .route
            .params
            .subscribe(params => {
                this.postId = params['postId'];
                this.post = this
                    .postService
                    .getPost(this.postId);
                this.commentsForSelectedPost = this
                    .commentService
                    .getComments(this.postId);
            });
    }
}