import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "password must be at least 8 charecters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const signupSchema = Yup.object({
  brand: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Brand Name Required"),
  email: Yup.string()
    .email("invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .max(12, "Mobile number not valid")
    .min(10, "Mobile number not valid")
    .required("Mobile is required"),
  companyRep: Yup.string().required("Field is required"),
  password: Yup.string()
    .min(6, "password must be at least 6 charecters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is Required"),
});

const signupSchemaInfluencer = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Full Name Required"),
  email: Yup.string()
    .email("invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .max(12, "Mobile number not valid")
    .min(10, "Mobile number not valid")
    .required("Mobile is required"),
  instaID: Yup.string().required("Insta Profile is required"),
  password: Yup.string()
    .min(6, "password must be at least 6 charecters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is Required"),
});

const firstStepSchema = Yup.object().shape({
  experienceName: Yup.string().required("Experience Name is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  experienceCategory: Yup.string().required("Experience Category is required"),
});

const secondStepSchema = Yup.object().shape({
  offerDescription: Yup.string()
    // .min(20, "Too Short!")
    // .max(500, "Too Long!")
    .required("Offer Description required"),
  contentDescription: Yup.string()
    // .min(20, "Too Short!")
    // .max(500, "Too Long!")
    .required("Content Description required"),
  welcomeMessage: Yup.string()
    // .min(20, "Too Short!")
    // .max(500, "Too Long!")
    .required("Welcome Message required"),
  minimumFollowers: Yup.string()
    .matches(/^\d+$/, "Must be a number")
    .min(1, "Must be at least 1")
    .required("Minimum number of followers required"),

});

const contactSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .required('Required'),
  email: Yup.string().email("Invalid email address").required("Required"),
  message: Yup.string()
    .max(200, "Must be 200 characters or less")
    .required("Required"),
});

export {
  loginValidationSchema,
  signupSchema,
  signupSchemaInfluencer,
  firstStepSchema,
  secondStepSchema,
  contactSchema
};
