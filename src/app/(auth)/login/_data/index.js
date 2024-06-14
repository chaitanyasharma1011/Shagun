import * as yup from "yup";

export const schema = yup.object().shape({
  //   email: yup
  //     .string()
  //     // .email("Enter a valid email")
  //     .required("Email is required")
  //     .trim(),
  phone: yup
    .string()
    .length(10, "Enter a valid phone number")
    .required("Phone number is required"),
  password: yup.string().required("Password is required"),
  // .matches(regex.PASSWORD, "Password is not valid"),
});
