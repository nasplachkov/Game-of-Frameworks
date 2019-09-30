export const PARAMETER_PLACEHOLDER = '[param]';

export const FormErrorMessages = {
  required: {
    message: 'This field is required'
  },
  passwordsDontMatch: {
    message: 'The passwords do not match'
  },
  email: {
    message: 'This is not a valid email'
  },
  lessThan: {
    message: `The value should be less than ${PARAMETER_PLACEHOLDER}`,
    paramName: 'comparand'
  },
  lessThanOrEqualTo: {
    message: `The value should be less or equal to ${PARAMETER_PLACEHOLDER}`,
    paramName: 'comparand'
  },
  greaterThanOrEqualTo: {
    message: `The value should be greater or equal to ${PARAMETER_PLACEHOLDER}`,
    paramName: 'comparand'
  },
  greaterThan: {
    message: `The value should be greater than ${PARAMETER_PLACEHOLDER}`,
    paramName: 'comparand'
  },
  minlength: {
    message: `The input should be at least ${PARAMETER_PLACEHOLDER} characters long`,
    paramName: 'requiredLength'
  },
  maxlength: {
    message: `The input should not exceed ${PARAMETER_PLACEHOLDER} characters`,
    paramName: 'requiredLength'
  },
  pattern: {
    message: 'Phone must contain only digits and dashes',
    paramName: 'pattern'
  }
};
