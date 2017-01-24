// Angular Core
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

// Modules and Components
import {PostsModule} from '../posts/post.module'
import {AuthModule} from '../auth/auth.module'
import {AppComponent} from './components/app.component';
import {AppHeaderComponent} from './components/app-header.component';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {FormsModule} from '@angular/forms';
// Firebase
import {FirebaseModule} from '../firebase';
// NGRX
import {RouterState} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// Reducer
import {routerReducer, RouterStoreModule} from '@ngrx/router-store';
import {authReducer} from '../auth/auth.reducer';
import {postReducer} from '../posts/post.reducer';
import {commentReducer} from '../posts/comment.reducer';

const appRoutes : Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: '/sign-in'
  }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, AppHeaderComponent
  ],
  imports: [

    BrowserModule, RouterModule.forRoot(appRoutes, {useHash: false}),
    StoreModule.provideStore({
      auth: authReducer,
      posts: postReducer,
      comments: commentReducer
    }, {
      router: {
        path: window.location.pathname + window.location.search
      }
    }),
    RouterStoreModule.connectRouter(),
    AuthModule,
    PostsModule,
    FormsModule,
    FirebaseModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})

export class AppModule {}