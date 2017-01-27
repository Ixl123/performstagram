import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/services/auth.service';
import {CommentService} from '../services/comment.service';
import Comment from '../datatypes/comment';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'comments', template: `
<div class="comments">
    <div *ngFor="let commentObservableArray of commentsForSelectedPost | async">
        <div *ngFor="let comment of commentObservableArray">
            <comment *ngIf="comment?.author && comment?.comment" [author]="comment.author" [text]="comment.comment" [key]="comment.key"
                [postId]="postId">
                </comment>
        </div>
    </div>
    <form class="comment-form" (ngSubmit)="onSubmit(author.value, comment.value); comment.value= ''">
        <input type="text" #author [value]="authService.getUserName() | async" readOnly/>
        <input type="text" #comment placeholder="comment" />
        <button type="submit" hidden>Submit</button>
    </form>
</div>
`})

export class CommentsComponent {
  @Input()commentsForSelectedPost : Observable < any >;
  @Input()postId : string;
  @ViewChild('comment')comment;

  constructor(private authService : AuthService, private commentService : CommentService) {}

  onSubmit(author : string, comment : string) {
    this
      .commentService
      .createCommment(new Comment(author, comment), this.postId)
  }
}