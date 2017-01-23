import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/services/auth.service';
import {Store} from '@ngrx/store';
import Comments from '../comments';
@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'comments', template: require('./comments.component.html')})

export class CommentsComponent {
  @Input()commentsForSelectedPost : Observable < any >;
  constructor(private authService : AuthService) {}

  onSubmit(author : string, comment : string) {
    debugger;

    console.log(author);
    console.log(comment);
  }
}