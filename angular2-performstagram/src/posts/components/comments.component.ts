import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/services/auth.service';
import {CommentService} from '../services/comment.service';
import Comments from '../comments';
import Comment from '../comment';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'comments', template: require('./comments.component.html')})

export class CommentsComponent {
  @Input()commentsForSelectedPost : Observable < any >;
  @Input()postId : string;

  constructor(private authService : AuthService, private commentService : CommentService) {}

  onSubmit(author : string, comment : string) {
    this
      .commentService
      .createCommment(new Comment(author, comment), this.postId)

  }
}