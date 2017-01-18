import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import {Auth} from '../auth'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public store : Store < any >, private router : Router, private auth : AuthService) {}

  canActivate() : Observable < boolean > {
    return this
      .auth
      .auth$
      .take(1)
      .map(authState => !!authState)
      .do 
        (authenticated => {
          if (!authenticated) {
            this
              .router
              .navigate(['/sign-in']);
          }
        });
      }
  }

// {     return new Promise((resolve, reject) => {       if
// (this.auth.authenticated) {         resolve(true);       } else {         if
// (this.auth.pending) {           this             .auth             .auth$
// .subscribe(() => {               resolve(this.auth.authenticated);   });    }
// else {           resolve(false);         }       } });   }