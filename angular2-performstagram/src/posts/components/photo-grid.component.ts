import 'rxjs/add/operator/pluck';

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PostService} from '../services/post.service'
import {CommentService} from '../services/comment.service'
@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'photo-grid', template: `
     <div>
                <div class="aligner">
                    <add-photo class="align-center"></add-photo>
                </div>
                <div class='photo-grid'>
                    <photo [posts]="postService.posts$"></photo>
                </div>
            </div>
  `})

export class PhotoGridComponent {

    constructor(public route : ActivatedRoute, public postService : PostService, public commentService : CommentService) {}
}
