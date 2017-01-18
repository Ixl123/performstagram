import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(public store : Store < any >, private router : Router, private auth : AuthService) {}
  canActivate() : Observable < boolean > {
    return this
      .auth
      .auth$
      .take(1)
      .map(authState => !authState)
      .do 
        (unauthenticated => {
          if (!unauthenticated) {
            this
              .router
              .navigate(['/photo-grid']);
          }
        });
      }
  }