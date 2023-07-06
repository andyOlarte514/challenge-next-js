'use client';

import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

import api from '@/config/api';

const LoginForm = () => {
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  const handleValidate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es obligatoria';
    }
    const isFormEmpty = Object.values(values).every((value) => value === '');
    const isFormInvalid = Object.keys(errors).length > 0;
    if (isFormEmpty || isFormInvalid) {
      errors._form = 'El formulario está vacío o es inválido';
    }
    return errors;
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await api.post('/auth/signin', values);
      
      if(!!response.data?.token){
        Cookies.set("jwt", response.data.token);
        router.push('/dashboard'); 
      }
    } catch (error) {
      console.error(error);
    }
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
              <label htmlFor="email" className="block mb-2">Correo electrónico:</label>
              <Field type="text" id="email" name="email" required className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Contraseña:</label>
              <Field type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button type="submit" disabled={!isValid} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed">
              Iniciar Sesión
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
