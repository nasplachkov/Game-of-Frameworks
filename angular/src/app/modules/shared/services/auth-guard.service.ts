import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../reducers';
import { AppConst, AppRoutes } from '../../../constants';
import { SaveUser } from '../../authentication/store/authentication.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem(AppConst.userStorageKey);
    user ?
      this.store.dispatch(new SaveUser((JSON.parse(user)))) :
      this.router.navigate([AppRoutes.authentication.login]);
    return !!user;
  }
}
