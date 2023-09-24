import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  loginInitialValues,
  signupInitialValues,
  validationSchema,
} from "./authSchema";

const AuthForm = ({ isSignup }) => {
  const initialValues = isSignup ? signupInitialValues : loginInitialValues;
  const schema = isSignup ? validationSchema.signup : validationSchema.login;
  //   function to run when form is submitted
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      if (isSignup) {
        // Handle signup
        console.log(values);
      } else {
        // Handle login
        console.log(values);
      }
      // Successfully authenticated
    } catch (error) {
      // Handle authentication errors
      setFieldError("email", "Invalid email or password");
      setFieldError("password", "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };
  const fields = isSignup
    ? [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      ]
    : [
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      ];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-1/2 shadow px-5 py-10 rounded-2xl">
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label
                htmlFor={field.name}
                className="block ml-2 text-gray-700 text-sm font-bold mb-2"
              >
                {field.label}
              </label>
              <Field
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 ml-2 text-xs mt-2"
              />
            </div>
          ))}
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
