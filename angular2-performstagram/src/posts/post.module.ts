// Angular
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {ModalModule} from "ngx-modal";

// Guards
import {AuthGuard} from '../auth/auth.module';

// Components
import {AddPhotoComponent} from './components/add-photo.component';
import {PhotoGridComponent} from './components/photo-grid.component';
import {CommentsComponent} from './components/comments.component';
import {PhotoComponent} from './components/photo.component';
import {SingleComponent} from './components/single.component';
import {CommentComponent} from './components/comment.component';
import {AddPhotoModalComponent} from './components/add-photo-modal.component';
import {AddPhotoImagePreviewComponent} from './components/add-photo-preview.component';
import {AdditionCalculateWindow} from './components/test-modal.component';

// Services
import {PostService} from './services/post.service';
import {CommentService} from './services/comment.service';
import {ModalService} from './services/modal.service';
// Actions
import {PostActions} from './post.actions';
import {CommentActions} from './comment.actions';
import {ModalActions} from './modal.actions';

// EffectsModule
import {EffectsModule} from '@ngrx/effects';
import {PostEffects} from './post.effects'
import {CommentEffects} from './comment.effects'
// file upload module
import {FileUploadModule} from "ng2-file-upload";

const routes : Routes = [
    {
        path: 'photo-grid',
        component: PhotoGridComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'single/:postId',
        component: SingleComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        PhotoGridComponent,
        CommentsComponent,
        PhotoComponent,
        SingleComponent,
        AddPhotoComponent,
        CommentComponent,
        AddPhotoModalComponent,
        AddPhotoImagePreviewComponent
    ],
    imports: [
        ModalModule, CommonModule, FormsModule, RouterModule.forChild(routes),
        FileUploadModule,
        EffectsModule.run(PostEffects),
        EffectsModule.run(CommentEffects)

    ],

    providers: [
        PostService,
        PostActions,
        CommentService,
        CommentActions,
        ModalActions,
        ModalService
    ]
})

export class PostsModule {}

export {PostService};
