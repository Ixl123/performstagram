import {Injectable} from '@angular/core';
import {AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState} from 'angularfire2';
import AuthActions from '../auth.actions';
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {Auth} from '../auth'
@Injectable()
export class NewAuthService {
    newAuthState$ : Observable < Auth >;

    constructor(public auth$ : FirebaseAuth, private store : Store < any >, private actions : AuthActions) {
        this.newAuthState$ = store.select(state => state)as Observable < Auth >;
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
            .catch(error => console.log('ERROR @ AuthService#signInAnonymously() :', error));
    }

    signInWithGithub() : firebase.Promise < FirebaseAuthState > {
        return this.authenticate(AuthProviders.Github);
    }

    signInWithGoogle() : firebase.Promise < FirebaseAuthState > {
        return this.authenticate(AuthProviders.Google);
    }

    signOut() : void {

        return this
            .store
            .dispatch(this.actions.signOutSuccess({authenticated: false, id: '', displayName: ''}));

    }
}
