import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './modules/shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'movies',
    loadChildren: './modules/movies/movies.module#MoviesModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
