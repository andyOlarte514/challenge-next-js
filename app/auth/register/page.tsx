'use client';

import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';

const RegistroForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleValidate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = 'El nombre es obligatorio';
    }
    if (!values.email) {
      errors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es obligatoria';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    const isFormEmpty = Object.values(values).every((value) => value === '');
    const isFormInvalid = Object.keys(errors).length > 0;
    if (isFormEmpty || isFormInvalid) {
      errors._form = 'El formulario está vacío o es inválido';
    }
    return errors;
  };

  const handleSubmit = (values: any) => {
    console.log('Registro exitoso', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={handleValidate}
    >
      {({ handleSubmit, isValid }) => (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
          <div className="max-w-sm w-full p-4 border border-gray-300 rounded-md shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Nombre:</label>
              <Field type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500"/>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Correo electrónico:</label>
              <Field type="text" id="email" name="email" required className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Contraseña:</label>
              <Field type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">Confirmar contraseña:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full p-2 border border-gray-300 rounded"
                />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
            </div>
            <button type="submit" disabled={!isValid} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed">
              Registrarse
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegistroForm;
