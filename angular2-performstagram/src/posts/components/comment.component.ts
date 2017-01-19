import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({selector: 'comment', templateUrl: require('./comment.component.html')})
export class CommentComponent {
    @Input()comment : Observable < Comment >;
    constructor() {}

}