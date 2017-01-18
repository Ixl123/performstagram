import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SignInComponent} from './components/sign-in.component';
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';
import {AuthService} from './services/auth.service';
import AuthActions from './auth.actions'
const routes : Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [UnauthGuard]
  }
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  providers: [AuthGuard, AuthService, UnauthGuard, AuthActions]
})

export class AuthModule {}
export {AuthGuard};
export {UnauthGuard};
export {AuthService};