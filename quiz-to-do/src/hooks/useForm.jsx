import { useState, useCallback } from 'react';

function useForm(initialState = {}, validationSchema = null) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    if (!validationSchema || !validationSchema[name]) return '';

    const rules = validationSchema[name];
    if (rules.required && !value) return 'This field is required';
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || 'Invalid format';
    }
    if (rules.validate) {
      return rules.validate(value, values);
    }
    return '';
  }, [validationSchema, values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationSchema) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setIsSubmitting(false);
  };

  const setFieldValue = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (validationSchema) {
      const fieldError = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: fieldError
      }));
    }
  };

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;

    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values]);

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setErrors,
    validateForm
  };
}

export default useForm;