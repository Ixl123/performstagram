import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router'
import {PostService} from '../services/post.service';
import Posts from '../posts';
import Comments from '../comments';
@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'photo', template: require('./photo.component.html')})

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
