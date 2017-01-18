import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import Posts from '../posts';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'photo', template: require('./photo.component.html')})

export class PhotoComponent {
    @Input()posts : Observable < Posts[] >;

    @Output()updatePost : EventEmitter < any > = new EventEmitter(false);

}
