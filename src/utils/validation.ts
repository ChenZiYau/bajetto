/**
 * Form Validation Utilities
 * Centralized validation rules and helpers
 */
import { VALIDATION } from '../config';

// =============================================================================
// TYPES
// =============================================================================
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type Validator = (value: any) => ValidationResult;

// =============================================================================
// BASE VALIDATORS
// =============================================================================

/**
 * Required field validator
 */
export const required = (message = 'This field is required'): Validator => {
  return (value: any): ValidationResult => {
    const isValid =
      value !== undefined &&
      value !== null &&
      value !== '' &&
      (typeof value !== 'string' || value.trim() !== '');

    return {
      isValid,
      error: isValid ? undefined : message,
    };
  };
};

/**
 * Minimum length validator
 */
export const minLength = (min: number, message?: string): Validator => {
  return (value: string): ValidationResult => {
    const isValid = !value || value.length >= min;
    return {
      isValid,
      error: isValid ? undefined : message || `Must be at least ${min} characters`,
    };
  };
};

/**
 * Maximum length validator
 */
export const maxLength = (max: number, message?: string): Validator => {
  return (value: string): ValidationResult => {
    const isValid = !value || value.length <= max;
    return {
      isValid,
      error: isValid ? undefined : message || `Must be at most ${max} characters`,
    };
  };
};

/**
 * Minimum value validator (for numbers)
 */
export const minValue = (min: number, message?: string): Validator => {
  return (value: number): ValidationResult => {
    const isValid = value === undefined || value === null || value >= min;
    return {
      isValid,
      error: isValid ? undefined : message || `Must be at least ${min}`,
    };
  };
};

/**
 * Maximum value validator (for numbers)
 */
export const maxValue = (max: number, message?: string): Validator => {
  return (value: number): ValidationResult => {
    const isValid = value === undefined || value === null || value <= max;
    return {
      isValid,
      error: isValid ? undefined : message || `Must be at most ${max}`,
    };
  };
};

/**
 * Email validator
 */
export const email = (message = 'Invalid email address'): Validator => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value: string): ValidationResult => {
    const isValid = !value || emailRegex.test(value);
    return {
      isValid,
      error: isValid ? undefined : message,
    };
  };
};

/**
 * Numeric validator
 */
export const numeric = (message = 'Must be a number'): Validator => {
  return (value: any): ValidationResult => {
    const isValid =
      value === undefined ||
      value === null ||
      value === '' ||
      !isNaN(Number(value));
    return {
      isValid,
      error: isValid ? undefined : message,
    };
  };
};

/**
 * Positive number validator
 */
export const positive = (message = 'Must be a positive number'): Validator => {
  return (value: number): ValidationResult => {
    const isValid =
      value === undefined || value === null || Number(value) > 0;
    return {
      isValid,
      error: isValid ? undefined : message,
    };
  };
};

/**
 * Pattern validator (regex)
 */
export const pattern = (regex: RegExp, message: string): Validator => {
  return (value: string): ValidationResult => {
    const isValid = !value || regex.test(value);
    return {
      isValid,
      error: isValid ? undefined : message,
    };
  };
};

// =============================================================================
// COMPOSE VALIDATORS
// =============================================================================

/**
 * Compose multiple validators into one
 * Returns the first error found, or valid if all pass
 */
export const compose = (...validators: Validator[]): Validator => {
  return (value: any): ValidationResult => {
    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  };
};

// =============================================================================
// DOMAIN-SPECIFIC VALIDATORS
// =============================================================================

/**
 * Transaction amount validator
 */
export const transactionAmount = compose(
  required('Amount is required'),
  numeric('Amount must be a number'),
  minValue(VALIDATION.transaction.minAmount, `Amount must be at least ${VALIDATION.transaction.minAmount}`),
  maxValue(VALIDATION.transaction.maxAmount, 'Amount is too large')
);

/**
 * Transaction title validator
 */
export const transactionTitle = compose(
  required('Title is required'),
  minLength(VALIDATION.transaction.minTitleLength, 'Title is too short'),
  maxLength(VALIDATION.transaction.maxTitleLength, 'Title is too long')
);

/**
 * Transaction note validator
 */
export const transactionNote = maxLength(
  VALIDATION.transaction.maxNoteLength,
  'Note is too long'
);

/**
 * Budget amount validator
 */
export const budgetAmount = compose(
  required('Budget limit is required'),
  numeric('Budget must be a number'),
  minValue(VALIDATION.budget.minAmount, 'Budget must be positive'),
  maxValue(VALIDATION.budget.maxAmount, 'Budget is too large')
);

/**
 * Budget name validator
 */
export const budgetName = compose(
  required('Name is required'),
  minLength(VALIDATION.budget.minNameLength, 'Name is too short'),
  maxLength(VALIDATION.budget.maxNameLength, 'Name is too long')
);

/**
 * PIN validator
 */
export const pin = compose(
  required('PIN is required'),
  minLength(VALIDATION.pin.length, `PIN must be ${VALIDATION.pin.length} digits`),
  maxLength(VALIDATION.pin.length, `PIN must be ${VALIDATION.pin.length} digits`),
  pattern(/^\d+$/, 'PIN must contain only numbers')
);

// =============================================================================
// FORM VALIDATION HELPER
// =============================================================================

export interface FormErrors {
  [field: string]: string | undefined;
}

/**
 * Validate an entire form
 * @param values - Object with form field values
 * @param validators - Object mapping field names to validators
 * @returns Object with field errors (empty object if valid)
 */
export const validateForm = <T extends Record<string, any>>(
  values: T,
  validators: Partial<Record<keyof T, Validator>>
): FormErrors => {
  const errors: FormErrors = {};

  for (const [field, validator] of Object.entries(validators)) {
    if (validator) {
      const result = (validator as Validator)(values[field]);
      if (!result.isValid && result.error) {
        errors[field] = result.error;
      }
    }
  }

  return errors;
};

/**
 * Check if form has any errors
 */
export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};
