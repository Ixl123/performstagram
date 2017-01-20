import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Auth} from '../../auth/auth';
import {CommentService} from '../services/comment.service';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'comment', template: require('./comment.component.html')})

export class CommentComponent {
    @Input()author : string;
    @Input()text : string;
    constructor(commentService : CommentService) {}
}