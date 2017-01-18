import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'add-photo', template: `
     <div class="photo-grid__button_add">
                <button onClick={this.props.openModal} class="like">+ Add image</button>
     </div>
  `})

export class AddPhotoComponent {
    @Output()createTask : EventEmitter < any > = new EventEmitter(false);

    title : string = '';

    clear() : void {
        this.title = '';
    }

    submit() : void {
        const title: string = this
            .title
            .trim();
        if (title.length) {
            this
                .createTask
                .emit(title);
        }
        this.clear();
    }
}
