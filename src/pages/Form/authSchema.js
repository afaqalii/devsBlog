// authFormSchema.js
import * as Yup from "yup";

const commonValidation = {
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
};

export const loginInitialValues = {
  email: "",
  password: "",
};

export const signupInitialValues = {
  ...loginInitialValues,
  name: "",
};

export const validationSchema = {
  login: Yup.object().shape(commonValidation),

  signup: Yup.object().shape({
    ...commonValidation,
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
  }),
};
