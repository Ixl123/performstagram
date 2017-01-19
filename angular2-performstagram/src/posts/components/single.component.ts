import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Params, Router, ActivatedRoute} from '@angular/router';
import {PostService} from '../services/post.service'
import {CommentService} from '../services/comment.service'
import Post from '../post'
import 'rxjs/add/operator/switchMap';

@Component({selector: 'single', template: `

<div class='single-photo'>
                <photo [posts]="post" [comments]="commentService.comments$"></photo>
                <comments [postComments]="postComments"> </comments>
            </div>`})
export class SingleComponent implements OnInit {

    post : Observable < Array < Post > >;
    postComments : Observable < Array < Comment > >;

    constructor(private route : ActivatedRoute, private router : Router, private postService : PostService, private commentService : CommentService) {
        this.post = this
            .route
            .params
            .switchMap((params : Params) => this.postService.getPost(params['postId']))
        this.postComments = this
            .route
            .params
            .switchMap((params : Params) => this.commentService.getComments(params['postId']))
    }

    ngOnInit() {}

}