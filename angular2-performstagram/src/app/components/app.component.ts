import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.module';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Rx';

@Component({selector: 'app', template: `
    <app-header
      [authenticated]="authenticated"
      (signOut)="signOut()"></app-header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
    
  `})

export class AppComponent {
  authenticated : Observable < boolean >;
  constructor(private auth : AuthService, private router : Router, public store : Store < any >) {
    console.log('APP COMPONENT CREATED');
    this.authenticated = store.select((state) => {
      return state.auth.authenticated
    })
  }

  signOut() : void {
    this
      .auth
      .signOut();

  }
}
