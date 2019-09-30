import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';

import { ValidationErrorPipe } from './pipes/validation-error.pipe';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { AlertComponent } from './components/alert/alert.component';
import { GofLogoComponent } from './components/gof-logo/gof-logo.component';
import { CloseOnOutsideDirective } from './directives/close-on-outside.directive';

@NgModule({
  declarations: [
    ValidationErrorPipe,
    InputFieldComponent,
    AlertComponent,
    GofLogoComponent,
    CloseOnOutsideDirective
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ValidationErrorPipe,
    MatDialogModule,
    InputFieldComponent,
    GofLogoComponent,
    CloseOnOutsideDirective
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {
}
