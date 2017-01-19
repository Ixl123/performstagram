import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'comments', template: require('./comments.component.html')})

export class CommentsComponent {
  @Input()postComments : Observable < any >;

  constructor() {}
  renderComment() {}
}