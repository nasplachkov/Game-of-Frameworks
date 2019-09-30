import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

import { FormErrorMessages, PARAMETER_PLACEHOLDER } from '../constants';

@Pipe({
  name: 'validationError'
})
export class ValidationErrorPipe implements PipeTransform {

  private ERROR_MESSAGES = FormErrorMessages;

  transform(value: ValidationErrors, args?: any): string {

    if (value) {
      const errorKey = Object.keys(value)[0];
      const error = this.ERROR_MESSAGES[errorKey];
      if (error) {
        return error.message.replace(PARAMETER_PLACEHOLDER, value[errorKey][error.paramName]);
      }
    }

    return '';
  }

}
