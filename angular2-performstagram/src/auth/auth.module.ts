// Angular Core
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Components
import {SignInComponent} from './components/sign-in.component';

// Guards
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';

// Serices
import {AuthService} from './services/auth.service';

// Actions
import {AuthActions} from './actions/auth.actions';

// Effects
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';

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
    CommonModule, RouterModule.forChild(routes),
    EffectsModule.run(AuthEffects)
  ],
  providers: [AuthGuard, AuthService, UnauthGuard, AuthActions]
})

export class AuthModule {}
export {AuthGuard};
export {UnauthGuard};
export {AuthService};