import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'comments', template: `
     <div className='comments'>
     </div>
  `})

export class CommentsComponent {}