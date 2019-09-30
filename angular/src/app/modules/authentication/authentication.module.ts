import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { authenticationReducer } from './store/authentication.reducer';

export const AUTH_STATE_KEY = 'authentication';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    CommonModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature(AUTH_STATE_KEY, authenticationReducer)
  ]
})
export class AuthenticationModule {
}
