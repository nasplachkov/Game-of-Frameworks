import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { AppRoutes, FirebaseErrorMessageMap } from '../../../../constants';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthValidation } from '../../auth-validation.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public ROUTING_CONSTANTS = AppRoutes;

  public authForm: FormGroup;
  public serverErrorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(AuthValidation.minPassLength)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(AuthValidation.minPassLength)]],
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(AuthValidation.phoneRegex)]],
      address: ['', [Validators.required]]
    }, {
      validators: (this.passwordMatchingValidator)
    });
  }

  /**
   * Checks if the two password fields match and sets the appropriate error
   * @param {FormGroup} form
   * @returns {ValidationErrors | null}
   */
  private passwordMatchingValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    password.value === confirmPassword.value ? null : confirmPassword.setErrors({ passwordsDontMatch: true });
    return null;
  }

  /**
   * Makes a request to register a new user
   */
  public register(): void {
    const { email, password } = this.authForm.value;
    this.authService.register(email, password).subscribe(response => {
      if (response && response.error && response.error.error) {
        this.serverErrorMessage = FirebaseErrorMessageMap[response.error.error.message];
      }
    })
  }

}
