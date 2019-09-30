import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs/index';
import { catchError, switchMap } from 'rxjs/internal/operators';

import { HttpService } from '../../shared/services/http.service';
import { apiRequests, AppConst, AppRoutes } from '../../../constants';
import { AppState } from '../../../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private store: Store<AppState>,
    private httpService: HttpService,
    private router: Router) {
  }

  /**
   * Makes a login request, stores the user in the local storage and
   * navigates to the home route
   * @param {string} email
   * @param {string} password
   * @returns {Observable<any>}
   */
  public login(email: string, password: string): Observable<any> {
    return this.httpService.post(apiRequests.authentication.login, { email, password }).pipe(
      switchMap(response => {
        localStorage.setItem(AppConst.userStorageKey, JSON.stringify(response));
        this.router.navigate([AppRoutes.movies.list]);
        return of(response);
      }),
      catchError(err => of(err))
    );
  }

  /**
   * Makes a request to register a new user. If successfull - navigates
   * to the login page
   * @param {string} email
   * @param {string} password
   * @returns {Observable<any>}
   */
  public register(email: string, password: string): Observable<any> {
    return this.httpService.post(apiRequests.authentication.register, {
      email, password, returnSecureToken: true
    }).pipe(
      switchMap(response => {
        this.router.navigate([AppRoutes.authentication.login]);
        return of(response);
      }),
      catchError(err => of(err))
    );
  }

}
