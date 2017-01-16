import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NewAuthService} from '../services/newauth.service';
import {Store} from '@ngrx/store';
import AuthActions from '../auth.actions';
import {Observable} from 'rxjs/Rx';
import {Auth} from '../auth';
@Component({template: `
  <div class="sign-in_flex-container">
                <div class="sign-in_flex-item-account">
                    <button
                        class="btn sign-in__button"
                        (click)="signInWithGithub()"
                        type="button">
                        <i class="fa fa-github fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with GitHub
                    </button>
                    <button
                        class="btn sign-in__button"
                        (click)="signInWithGoogle()"
                        type="button">
                        <i class="fa fa-google fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with Google
                    </button>
                    <button
                        class="btn sign-in__button"
                        (click)="signInWithTestAccount()" 
                        type="button">
                        <i class="fa fa-user fa-lg" aria-hidden="true"></i>
                        &nbsp; Sign in with demo account</button>
                </div>
            </div>

  `})

export class SignInComponent {
  myAuth : Observable < Auth >;

  constructor(private router : Router, public store : Store < Auth >, private testAuth : NewAuthService) {}
  signInWithTestAccount() : void {

    this
      .testAuth
      .signInWithTestAccount()
      .then(() => this.postSignIn());
  }

  signInWithGithub() : void {
    this
      .testAuth
      .signInWithGithub()
      .then(() => this.postSignIn());
  }

  signInWithGoogle() : void {
    this
      .testAuth
      .signInWithGoogle()
      .then(() => this.postSignIn());
  }
  private postSignIn() : void {
    this
      .router
      .navigate(['/tasks']);
  }
}
