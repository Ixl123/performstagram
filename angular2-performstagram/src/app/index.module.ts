// Angular Core Modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

// Modules
import {PostsModule} from '../posts/post.module'
import {AuthModule} from '../auth/auth.module'

// Firebase Module
import {FirebaseModule} from '../firebase';

//Componenets
import {AppComponent} from './components/app.component';
import {AppHeaderComponent} from './components/app-header.component';

// NGRX
import {RouterState} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// Reducer
import {routerReducer, RouterStoreModule} from '@ngrx/router-store';
import {authReducer} from '../auth/reducers/auth.reducer';
import {postReducer} from '../posts/reducers/post.reducer';
import {commentReducer} from '../posts/reducers/comment.reducer';
import {modalReducer} from '../posts/reducers/modal.reducer';
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
      comments: commentReducer,
      modal: modalReducer
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
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})

export class AppModule {}