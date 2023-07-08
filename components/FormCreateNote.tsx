import React from "react";
import { Formik, Field, ErrorMessage } from "formik";

interface FormCreateNoteProps {
  onSubmit: (values: any, actions: any) => void;
}

const FormCreateNote: React.FC<FormCreateNoteProps> = ({ onSubmit }) => {
  const handleValidate = (values: any) => {
    const errors: any = {};
    if (!values.title) {
      errors.title = "The title is mandatory.";
    }

    if (!values.content) {
      errors.content = "The content is mandatory.";
    }
    return errors;
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Add New Note</h3>
      <Formik
        initialValues={{
          title: "",
          content: "",
        }}
        onSubmit={onSubmit}
        validate={handleValidate}
      >
        {({ handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit} data-testid="note-form">
            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2">
                Note Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Enter note title"
                required
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block font-semibold mb-2">
                Note Content
              </label>
              <Field
                type="textarea"
                id="content"
                name="content"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Enter note content"
              />
              <ErrorMessage
                name="content"
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
                Add
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreateNote;
