import React from 'react';

import { LogInSchema, LogInSchemaType, RegisterSchema, RegisterSchemaType } from '../schemas';

import { useFormik } from 'formik';

export const useAuth = () => {
  const [stage, setStage] = React.useState<'login' | 'register'>('login');

  const authInitValues = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  const changeStage = () => {
    setStage((prev) => (prev === 'login' ? 'register' : 'login'));
    form.setErrors({});
    form.setTouched({}, false);
  };

  const setSubmit = (values: LogInSchemaType | RegisterSchemaType) => {
    console.log(
      stage === 'login'
        ? {
            email: values.email,
            password: values.password
          }
        : values
    );
  };

  const form = useFormik<LogInSchemaType | RegisterSchemaType>({
    initialValues: authInitValues,
    validationSchema: stage === 'login' ? LogInSchema : RegisterSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      setSubmit(values);
    }
  });

  return {
    form,
    stage,
    changeStage
  };
};
