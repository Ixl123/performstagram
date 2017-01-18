// Angular
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

// Guards
import {AuthGuard} from '../auth/auth.module';

// Components
import {AddPhotoComponent} from './components/add-photo.component';
import {PhotoGridComponent} from './components/photo-grid.component';
import {CommentsComponent} from './components/comments.component';
import {PhotoComponent} from './components/photo.component';
import {SingleComponent} from './components/single.component';

// Services

import {PostService} from './services/post.service';
import {CommentService} from './services/comment.service';

// Actions
import {PostActions} from './post.actions';
import {CommentActions} from './comment.actions';

// EffectsModule
import {EffectsModule} from '@ngrx/effects';
import {PostEffects} from './post.effects'
import {CommentEffects} from './comment.effects'

const routes : Routes = [
    {
        path: 'photo-grid',
        component: PhotoGridComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        PhotoGridComponent, CommentsComponent, PhotoComponent, SingleComponent, AddPhotoComponent
    ],
    imports: [
        CommonModule, FormsModule, RouterModule.forChild(routes),
        EffectsModule.run(PostEffects),
        EffectsModule.run(CommentEffects)

    ],
    providers: [PostService, PostActions, CommentService, CommentActions]
})

export class PostsModule {}

export {PostService};
