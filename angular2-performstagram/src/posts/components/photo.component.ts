import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router'
import {PostService} from '../services/post.service';
import Posts from '../datatypes/posts';
import Comments from '../datatypes/comments';
@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'photo', template: `
<figure *ngFor="let post of posts | async ; let i = index" class="grid-figure">
    <div class="grid-photo-wrap">
        <img [src]="post.display_src" [alt]="post.caption" class="grid-photo" (click)="onSelect(post.code)" />
        <figcaption>
            <p>{{post.caption}}</p>
            <div class="control-buttons">
                <button (click)="postService.updatePost(post, i)" class="like">&hearts; {{post.likes}}</button>
                <button (click)="onSelect(post.code)">
                        <span class="comment-count">    
                            <span class="speech-bubble"></span><span *ngFor="let comment of comments | async"><span *ngIf="comment.code === post.code">  &nbsp; {{countComments(comment)}} </span></span>
                        </span>
                    </button>
            </div>
        </figcaption>
    </div>
</figure>`})

export class PhotoComponent {
    @Input()posts : Observable < Posts >;
    @Input()comments : Observable < Comments >;
    @Output()updatePost : EventEmitter < any > = new EventEmitter(false);

    constructor(public router : Router, public postService : PostService) {}
    countComments(comments) : number {
        // -2 because also they key for the right comment is saved in the object as well
        // as an exist method from firebase.
        return Object
            .keys(comments)
            .length - 2
    }
    onSelect(photoId : string) {
        this
            .router
            .navigate(['/single', photoId])
    }
}
