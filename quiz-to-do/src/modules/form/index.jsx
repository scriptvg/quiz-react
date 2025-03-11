import useForm from '../../hooks/useForm';
import useFormValidation from '../../hooks/useFormValidation';

export {
  useForm,
  useFormValidation
};

// Form utilities
export const validateField = (value, rules) => {
  let isValid = true;
  let error = '';

  if (!rules) return { isValid, error };

  if (rules.required && !value) {
    isValid = false;
    error = 'This field is required';
    return { isValid, error };
  }

  if (rules.minLength && value.length < rules.minLength) {
    isValid = false;
    error = `Minimum length is ${rules.minLength} characters`;
    return { isValid, error };
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    isValid = false;
    error = `Maximum length is ${rules.maxLength} characters`;
    return { isValid, error };
  }

  if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    isValid = false;
    error = 'Please enter a valid email address';
    return { isValid, error };
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    isValid = false;
    error = rules.patternError || 'Invalid format';
    return { isValid, error };
  }

  return { isValid, error };
};

export const createFormField = (initialValue = '', validationRules = {}) => ({
  value: initialValue,
  touched: false,
  error: '',
  validationRules
});