import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {NewAuthService} from '../services/newauth.service';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
  authenticaded : Observable < boolean >;

  constructor(public store : Store < any >, private router : Router) {
    this.authenticaded = this
      .store
      .select(state => state.auth.authenticated);
  }

  canActivate() : Observable < boolean > {
    debugger;
    return this
      .authenticaded
      .take(1)
      .map(authState => !!authState)
      .do 
        (authenticated => {
          debugger;
          if (!authenticated) {
            this
              .router
              .navigate(['/']);
          }
        });
      }
  }