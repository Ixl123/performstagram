// Angular Core
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

// Modules and Components
import {PostsModule} from '../posts/post.module'
import {AuthModule} from '../auth/auth.module'
import {AppComponent} from './components/app.component';
import {AppHeaderComponent} from './components/app-header.component';
import {FormsModule} from '@angular/forms';

// Firebase
import {FirebaseModule} from '../firebase';
// NGRX
import {RouterState} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

//test
import {AdditionCalculateWindow} from '../posts/components/test-modal.component';

// Reducer
import {routerReducer, RouterStoreModule} from '@ngrx/router-store';
import {authReducer} from '../auth/auth.reducer';
import {postReducer} from '../posts/post.reducer';
import {commentReducer} from '../posts/comment.reducer';
import {modalReducer} from '../posts/modal.reducer';
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
    AppComponent, AppHeaderComponent, AdditionCalculateWindow
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
  ],
  entryComponents: [AdditionCalculateWindow]

})

export class AppModule {}