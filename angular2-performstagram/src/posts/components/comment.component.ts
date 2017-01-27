import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CommentService} from '../services/comment.service';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'comment', template: `
<div class='comment'>
    <p>
        <strong>{{author}}</strong> {{text}}
        <button class="remove-comment" (click)="commentService.removeComment(postId, key)">&times;</button>
    </p>
</div>
`})

export class CommentComponent {
    @Input()author : string;
    @Input()text : string;
    @Input()key : string;
    @Input()postId : string;

    constructor(private commentService : CommentService) {}

}