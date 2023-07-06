import React from "react";
import { Formik, Field, ErrorMessage } from "formik";

interface FormCreateProjectProps {
  onSubmit: (values: any, actions: any) => void;
}

const FormCreateProject: React.FC<FormCreateProjectProps> = ({ onSubmit }) => {
  const handleValidate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "The name is mandatory.";
    }
    return errors;
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Create New Project</h2>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={onSubmit}
        validate={handleValidate}
      >
        {({ handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-2">
                Project Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                disabled={!isValid}
                type="submit"
                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreateProject;
