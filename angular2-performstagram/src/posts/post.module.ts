// Angular
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

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
import {AddPhotoImagePreviewComponent} from './components/add-photo-preview.component';

// Services
import {PostService} from './services/post.service';
import {CommentService} from './services/comment.service';
import {ModalService} from './services/modal.service';
// Actions
import {PostActions} from './actions/post.actions';
import {CommentActions} from './actions/comment.actions';
import {ModalActions} from './actions/modal.actions';

// EffectsModule
import {EffectsModule} from '@ngrx/effects';
import {PostEffects} from './effects/post.effects'
import {CommentEffects} from './effects/comment.effects'
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
