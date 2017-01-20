import {Injectable} from '@angular/core';
import {AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState} from 'angularfire2';
import AuthActions from '../auth.actions';
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {Auth} from '../auth';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    authState$ : Observable < Auth >;

    constructor(private router : Router, public auth$ : FirebaseAuth, private store : Store < any >, private actions : AuthActions) {

        this
            .auth$
            .subscribe((firebaseState : FirebaseAuthState) => {
                if (firebaseState !== null) {
                    this
                        .store
                        .dispatch(this.actions.initAuth({authenticated: true, id: firebaseState.auth.uid, displayName: firebaseState.auth.displayName}))
                } else {
                    this
                        .store
                        .dispatch(this.actions.initAuth({authenticated: false, id: '', displayName: ''}))
                }
            });
        this.authState$ = store.select('auth')as Observable < Auth >;
    }
    getUserName() : Observable < String > {
        return this
            .authState$
            .map(auth => auth.displayName);
    }
    authenticate(provider : number) : firebase.Promise < FirebaseAuthState > {
        return this
            .auth$
            .login({provider})
            .then((firebaseAuthState) => this.store.dispatch(this.actions.signInSuccess({authenticated: true, id: firebaseAuthState.auth.uid, displayName: firebaseAuthState.auth.displayName})))
            .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
    }

    signInWithTestAccount() : firebase.Promise < FirebaseAuthState > {
        return this
            .auth$
            .login({
                email: 'default@default.de',
                password: 'default'
            }, {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            })
            .then((firebaseAuthState) => this.store.dispatch(this.actions.signInSuccess({authenticated: true, id: firebaseAuthState.auth.uid, displayName: firebaseAuthState.auth.displayName})))
            .catch(error => console.log('ERROR @ AuthService#signInWithTestAccount() :', error));
    }

    signInWithGithub() : firebase.Promise < FirebaseAuthState > {
        return this.authenticate(AuthProviders.Github);
    }

    signInWithGoogle() : firebase.Promise < FirebaseAuthState > {
        return this.authenticate(AuthProviders.Google);
    }

    signOut() : void {
        this
            .auth$
            .logout();
        this
            .router
            .navigate(['sign-in']);
        return this
            .store
            .dispatch(this.actions.signOutSuccess({authenticated: false, id: '', displayName: ''}));

    }

}
