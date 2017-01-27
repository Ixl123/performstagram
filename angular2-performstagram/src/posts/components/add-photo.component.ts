import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
    ViewContainerRef,
    ViewChild
} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {PostService} from '../services/post.service';
import {ModalService} from '../services/modal.service';
import {AuthService} from '../../auth/services/auth.service';
import Post from '../post';
import {Observable} from 'rxjs/Observable';
import {UUID} from 'angular2-uuid';

@Component({changeDetection: ChangeDetectionStrategy.OnPush, selector: 'add-photo', template: `
     <div class="photo-grid__button_add">
                <button (click)="myModal.open()" class="like">+ Add image</button>
                  <modal #myModal [hideCloseButton]="true" [closeOnOutsideClick]="true">
        <modal-content>
        <h2>Upload a image</h2>
        <label for="uploader-input" ng2FileDrop (fileOver)="fileOverBase($event)" [uploader]="uploader">
            <div class="add-photo-drop-zone">Try dropping some files here, or click to select files to upload.
                <div *ngFor="let item of uploader.queue" class="media">
                    <img src="" imgPreview [image]="item?._file" class="media-object" />
                </div>  
            </div>
        </label>
        <input type="file" ng2FileSelect [uploader]="uploader"  id="uploader-input" style="display:none" accept="image/*" (click)="onClick($event);" (change)="onChange($event)" />
            <form
                ref="uploadForm"
                class="comment-form">
                <input type="text" #caption placeholder="caption"/>
                <div class="modal-grid__button">
                    <button class="modal-grid__button_submit" (click)="handleCreatePost(caption.value)">
                        <input type="submit" value="Upload"/></button>
                </div>
        </form>
        </modal-content>
    </modal>
     </div>
  `})

export class AddPhotoComponent {
    @ViewChild('myModal')modal;

    public hasBaseDropZoneOver : boolean = false;
    public uploader : FileUploader = new FileUploader({
        isHTML5: true,
        allowedMimeType: [
            'image/png', 'image/jpg', 'image/jpeg', 'image/gif'
        ],
        queueLimit: 1
    });
    constructor(public postService : PostService, private modalService : ModalService, private authService : AuthService) {}
    onChange(event : any) : void {
        console.log('ON_CHANGE');
    }
    fileOverBase(e : any) : void {
        debugger;
        console.log(e);
        this.hasBaseDropZoneOver = e;
    }
    handleCreatePost(postCaption : string) {
        let file : File = this.uploader.queue[0]._file;
        if (file !== undefined) {
            this
                .modal
                .close();
            let caption : string = postCaption;
            let author : string = 'test';
            let id : string = UUID.UUID();
            this
                .modalService
                .closeModal(false);
            this
                .authService
                .getUserName()
                .subscribe(v => {
                    author = v;
                });
            debugger;

            const newPost = {
                author,
                caption,
                file,
                id
            }

            debugger;
            this
                .postService
                .createPost(newPost);

        } else {
            this
                .modal
                .close();
        }

    }
    onClick() {

        this.uploader.queue
        this
            .uploader
            .clearQueue();
        // this     .modal     .open(AddPhotoModalComponent, new
        // AdditionCalculateWindowData(3, 4));

    }
}