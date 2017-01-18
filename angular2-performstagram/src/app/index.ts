import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from '../auth/auth.module'
import {FirebaseModule} from '../firebase';
import {PostsModule} from '../posts/post.module'
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppComponent} from './components/app.component';
import {AppHeaderComponent} from './components/app-header.component';
import {authReducer} from '../auth/auth.reducer';
import {postReducer} from '../posts/post.reducer';
import {StoreModule} from '@ngrx/store';
import {routerReducer, RouterStoreModule} from '@ngrx/router-store';
import {RouterState} from '@ngrx/router-store';
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
      posts: postReducer
    }, {
      router: {
        path: window.location.pathname + window.location.search
      }
    }),
    RouterStoreModule.connectRouter(),
    AuthModule,
    PostsModule,
    FirebaseModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})

export class AppModule {}