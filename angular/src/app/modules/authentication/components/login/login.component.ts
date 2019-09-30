import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/internal/operators';
import { of } from 'rxjs/index';

import { AppRoutes, FirebaseErrorMessageMap } from '../../../../constants';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthValidation } from '../../auth-validation.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public ROUTING_CONSTANTS = AppRoutes;

  public loginForm: FormGroup;
  public serverErrorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(AuthValidation.minPassLength)]]
    });
  }

  /**
   * Performs a login requests and handles the errors.
   */
  public login(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(catchError(err => of(err))).subscribe(response => {
      if (response && response.error && response.error.error) {
        this.serverErrorMessage = FirebaseErrorMessageMap[response.error.error.message];
      }
    });
  }

}
