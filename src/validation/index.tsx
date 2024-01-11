
import * as yup from "yup"

export const RegisterSchema = yup
  .object({
    username: yup.string().required("Username is required").min(5,"Username shouid be at least 5 characters"),
    email: yup.string().required("email is required").matches(/^[^@]+@[^@'.]+\.[^@'.]{2,}$/,"Not a valid email address"),
    password:yup.string().required("password is required").min(6,"Username shouid be at least 6 characters")
  }) .required()
  export const LoginSchema = yup
  .object({
    identifier: yup.string().required("email is required").matches(/^[^@]+@[^@'.]+\.[^@'.]{2,}$/,"Not a valid email address"),
    password:yup.string().required("password is required").min(6,"Username shouid be at least 6 characters")
  }) .required()




