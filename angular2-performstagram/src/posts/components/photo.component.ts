import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router'
import Posts from '../posts';
import Comments from '../comments';
@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'photo', template: require('./photo.component.html')})

export class PhotoComponent {
    @Input()posts : Observable < Posts >;
    @Input()comments : Observable < Comments >;

    @Output()updatePost : EventEmitter < any > = new EventEmitter(false);

    constructor(public router : Router) {
        console.log(this.posts);
        console.log(this.comments);
    }
    countComments(comments) : number {
        // -1 because also they key for the right comment is saved in the object.
        return Object
            .keys(comments)
            .length - 1
    }

    onSelect(photoId : string) {
        this
            .router
            .navigate(['/single', photoId])
    }

}
