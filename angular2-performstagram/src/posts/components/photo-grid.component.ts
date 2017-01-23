import 'rxjs/add/operator/pluck';

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../services/post.service';
import {CommentService} from '../services/comment.service';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'photo-grid', template: `
     <div>
         <div class="aligner">
            <add-photo class="align-center"></add-photo>
         </div>
         <photo *ngIf="(postService.posts$ | async) && (commentService.comments$ | async)" [posts]="postService.posts$" [comments]="commentService.comments$" class="photo-grid"></photo>
         
    </div>
  `})

export class PhotoGridComponent {
    constructor(public route : ActivatedRoute, public postService : PostService, public commentService : CommentService) {}
}
