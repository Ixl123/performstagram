import {Component} from '@angular/core';

import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {FileUploader} from 'ng2-file-upload';
import {ElementRef} from '@angular/core';
export class AdditionCalculateWindowData extends BSModalContext {
    constructor(public num1 : number, public num2 : number) {
        super();
    }
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
    selector: 'add-photo-modal',

    // TODO: [ngClass] here on purpose, no real use, just to show how to workaround
    // ng2 issue #4330. Remove when solved.
    /* tslint:disable */
    template: `
        <h2>Upload a image</h2>
        <label for="uploader-input" ng2FileDrop (fileOver)="fileOverBase($event)" [uploader]="uploader">
            <div class="add-photo-drop-zone">Try dropping some files here, or click to select files to upload.
                <div *ngFor="let item of uploader.queue" class="media">
                    <img src="" imgPreview [image]="item?._file" class="media-object" />
                </div>  
            </div>
        </label>
        <input type="file" ng2FileSelect [uploader]="uploader"  id="uploader-input" style="display:none" accept="image/*" (click)="onChange($event);" />
        <form
                ref="uploadForm"
                class="comment-form">
                <input type="text" ref="title" placeholder="title"/>
                <input type="text" ref="caption" placeholder="caption"/>
                <div class="modal-grid__button">
                    <button class="modal-grid__button_submit" (click)="upload()">
                        <input type="submit" value="Upload"/></button>
                </div>
        </form>`
})
export class AddPhotoModalComponent implements ModalComponent < AdditionCalculateWindowData > {
    public hasBaseDropZoneOver : boolean = false;
    public context : AdditionCalculateWindowData;
    public uploader : FileUploader = new FileUploader({
        isHTML5: true,
        allowedMimeType: [
            'image/png', 'image/jpg', 'image/jpeg', 'image/gif'
        ],
        queueLimit: 1
    });
    public wrongAnswer : boolean;

    constructor(public dialog : DialogRef < AdditionCalculateWindowData >) {
        console.log('DIALOG CREATED')
        this.context = dialog.context;
        this.wrongAnswer = true;
    }
    private onChange(event : any) : void {
        console.log('ONE change');
        this
            .uploader
            .clearQueue();
    }
    public fileOverBase(e : any) : void {
        debugger;
        console.log(e);
        this.hasBaseDropZoneOver = e;
    }
    onKeyUp(value) {
        this.wrongAnswer = value != 5;
        this
            .dialog
            .close();
    }

    beforeDismiss() : boolean {return true;}

    beforeClose() : boolean {return this.wrongAnswer;}
}
