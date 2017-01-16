import {Component} from '@angular/core';
import {NewAuthService} from '../../auth';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app',
  styles: [require('./app.styl').toString()],
  template: `
    <app-header
      [authenticated]="authenticated"
      (signOut)="signOut()"></app-header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
    
  `
})

export class AppComponent {
  authenticated : Observable < boolean >;
  constructor(private router : Router, public store : Store < any >, private auth : NewAuthService) {
    this.authenticated = store.select((state) => {
      return state.auth.authenticated
    })
  }

  signOut() : void {
    this
      .router
      .navigate(['/']);
    this
      .auth
      .signOut();
  }
}
