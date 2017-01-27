import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AuthActions} from '../actions/auth.actions';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Auth} from '../datatypes/auth';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(private actions$ : Actions, private store$ : Store < any >, public authActions : AuthActions, private router : Router) {}

    @Effect()
    loadComments$ = this
        .actions$
        .ofType(AuthActions.SIGN_OUT_SUCCESS)
        .switchMap(() => {
            this
                .router
                .navigate(['sign-in']);
            return this
                .router
                .navigate(['sign-in']);
        })
        .map(() => this.authActions.navigateToSignIn());

}