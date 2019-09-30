import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutes } from '../../constants';
import { MoviesListComponent } from './components/movies-list/movies-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MoviesListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MoviesRoutingModule {
}
