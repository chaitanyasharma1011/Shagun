import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("This field is required").trim(),
  email: yup
    .string()
    // .email("Enter a valid email")
    .required("Email is required")
    .trim(),
  phone: yup
    .string()
    .length(10, "Enter a valid phone number")
    .required("Phone number is required"),
  password: yup.string().required("This field is required").trim(),
  confirmPassword: yup.string().required("This field is required").trim(),
  // .matches(regex.PASSWORD, "Password is not valid"),
});
