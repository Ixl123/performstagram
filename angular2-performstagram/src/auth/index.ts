import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SignInComponent} from './components/sign-in.component';
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';
import {NewAuthService} from './services/newauth.service';
import AuthActions from './auth.actions'
const routes : Routes = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [UnauthGuard]
  }
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  providers: [AuthGuard, NewAuthService, UnauthGuard, AuthActions]
})

export class AuthModule {}
export {AuthGuard};
export {UnauthGuard};
export {NewAuthService};