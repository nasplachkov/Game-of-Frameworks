import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutes } from '../../constants';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.authentication.login,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.authentication.login,
    component: LoginComponent
  },
  {
    path: AppRoutes.authentication.register,
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
