import {
    Directive,
    ElementRef,
    Input,
    Renderer,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {ModalService} from '../services/modal.service'
@Directive({selector: 'img[imgPreview]'})

export class AddPhotoImagePreviewComponent {

    @Input()image : any;

    constructor(private el : ElementRef, private renderer : Renderer, private modalService : ModalService) {}

    ngOnChanges(changes : SimpleChanges) {

        let reader = new FileReader();
        let el = this.el;

        reader.onloadend = function (e) {
            el.nativeElement.src = reader.result;
        };
        if (this.image) {
            //add file to redux store
            this
                .modalService
                .addFile({
                    preview: URL.createObjectURL(this.image)
                });
            return reader.readAsDataURL(this.image);
        }

    }

}