"use client";

import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import Link from "next/link";
import api from "@/config/api";

const RegistroForm = () => {
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleValidate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "The name is mandatory";
    }
    if (!values.email) {
      errors.email = "The email is mandatory.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "The email address is not valid.";
    }
    if (!values.password) {
      errors.password = "The password is mandatory.";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "You must confirm the password.";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "The passwords do not match.";
    }
    const isFormEmpty = Object.values(values).every((value) => value === "");
    const isFormInvalid = Object.keys(errors).length > 0;
    if (isFormEmpty || isFormInvalid) {
      errors._form = "The form is empty or invalid.";
    }
    return errors;
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await api.post("/users", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      if (response.statusText === "Created") {
        setIsUserCreated(true);
        actions.resetForm();
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while registering.");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={handleValidate}
    >
      {({ handleSubmit, isValid }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-screen"
        >
          <div className="max-w-sm w-full p-4 border border-gray-300 rounded-md shadow-md">
            {isUserCreated && !errorMessage && (
              <div className="text-green-500 text-center mb-4">
                User created successfully.
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email address:
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm password:
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Sign up.
            </button>
            <div className="mt-2 text-center">
              <Link href="/auth/login">
                <span className="text-blue-500 cursor-pointer">
                  Already have an account? Sign in.
                </span>
              </Link>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegistroForm;
