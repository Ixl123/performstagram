import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AuthModule} from '../auth';
import {FirebaseModule} from '../firebase';
import {TasksModule} from '../tasks';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppComponent} from './components/app';
import {AppHeaderComponent} from './components/app-header';
import {authReducer} from '../auth/auth.reducer';
import {StoreModule} from '@ngrx/store';
import {routerReducer, RouterStoreModule} from '@ngrx/router-store';
import {RouterState} from '@ngrx/router-store';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, AppHeaderComponent
  ],
  imports: [

    BrowserModule, RouterModule.forRoot([], {useHash: false}),
    StoreModule.provideStore({
      auth: authReducer
    }, {
      router: {
        path: window.location.pathname + window.location.search
      }
    }),
    RouterStoreModule.connectRouter(),
    AuthModule,
    FirebaseModule,
    TasksModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})

export class AppModule {}