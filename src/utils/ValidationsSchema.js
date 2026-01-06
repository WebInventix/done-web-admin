import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const today = new Date();
today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

export const validationsSchema = (formType) => {
  switch (formType) {
    case "signup":
      return Yup.object().shape({
        first_name: Yup.string()
          .transform((value) => value.trim()) // This will remove leading and trailing spaces
          .matches(
            /^[A-Za-z]/,
            "First name should not start with a number or special character"
          )
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("First name is required"),

        last_name: Yup.string()
          .transform((value) => value.trim()) // This will remove leading and trailing spaces
          .matches(
            /^[A-Za-z]/,
            "Last name should not start with a number or special character"
          )
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Last name is required"),

        email: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .email("Invalid email address")
          .matches(emailRegex, "Please enter a valid email address")
          .required("Email is required"),

        // phone: Yup.string()
        //   .transform((value) => value.trim()) // Trim leading/trailing spaces
        //   .matches(
        //     /^(?:\+?1[-.\s]?)?\(?([2-9][0-9]{2})\)?[-.\s]?[2-9][0-9]{2}[-.\s]?[0-9]{4}$/,
        //     "Invalid phone number"
        //   )
        //   .required("Phone number is required"),
        phone: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .matches(/^\d{10,15}$/, "Invalid phone number") // Allows 10-15 digits
          .required("Phone number is required"),
        password: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .min(8, "Must be at least 8 characters")
          .required("Password is required"),

        confirmPassword: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),

        services: Yup.array()
          .min(1, "Please select at least one service")
          .required("Service selection is required"),

        cities: Yup.array()
          .min(1, "Please select at least one service area")
          .required("Service area selection is required"),
      });
    case "user_signup":
      return Yup.object().shape({
        first_name: Yup.string()
          .transform((value) => value.trim()) // This will remove leading and trailing spaces
          .matches(
            /^[A-Za-z]/,
            "First name should not start with a number or special character"
          )
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("First name is required"),

        last_name: Yup.string()
          .transform((value) => value.trim()) // This will remove leading and trailing spaces
          .matches(
            /^[A-Za-z]/,
            "Last name should not start with a number or special character"
          )
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Last name is required"),

        email: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .email("Invalid email address")
          .matches(emailRegex, "Please enter a valid email address")
          .required("Email is required"),

        // phone: Yup.string()
        //   .transform((value) => value.trim()) // Trim leading/trailing spaces
        //   .matches(
        //     /^(?:\+?1[-.\s]?)?\(?([2-9][0-9]{2})\)?[-.\s]?[2-9][0-9]{2}[-.\s]?[0-9]{4}$/,
        //     "Invalid phone number"
        //   )
        //   .required("Phone number is required"),
        phone: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .matches(/^\d{10,15}$/, "Invalid phone number") // Allows 10-15 digits
          .required("Phone number is required"),

        password: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .min(8, "Must be at least 8 characters")
          .required("Password is required"),

        confirm_password: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
      });
    case "login":
      return Yup.object().shape({
        email: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .email("Invalid email address")
          .matches(emailRegex, "Please enter a valid email address")
          .required("Email is required"),
        password: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .min(8, "Must be at least 8 characters")
          .required("Password is required"),
      });
    case "forgot_password":
      return Yup.object().shape({
        email: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .email("Invalid email address")
          .matches(emailRegex, "Please enter a valid email address")
          .required("Email is required"),
      });

    case "otp":
      return Yup.object().shape({
        otp: Yup.string()
          .trim()
          .matches(/^[0-9]{4}$/, "OTP must be exactly 4 digits")
          .required("OTP is required"),
      });

    case "reset_password":
      return Yup.object().shape({
        password: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .min(7, "Must be at least 7 characters")
          .required("Password is required"),

        confirm_password: Yup.string()
          .transform((value) => value.trim()) // Trim leading/trailing spaces
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
      });
    case "vendor_persona_details":
      return Yup.object().shape({
        first_name: Yup.string()
          .transform((value) => value.trim()) // This will remove leading and trailing spaces
          .matches(
            /^[A-Za-z]/,
            "First name should not start with a number or special character"
          )
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("First name is required"),

        last_name: Yup.string()
          .transform((value) => value.trim()) // This will remove leading and trailing spaces
          .matches(
            /^[A-Za-z]/,
            "Last name should not start with a number or special character"
          )
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Last name is required"),
        dob: Yup.date().required("Date of Birth is required"),
        country: Yup.string().required("Country is required"),
        street: Yup.string()
          .trim()
          .min(3, "Street is too short")
          .required("Street is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        postal_code: Yup.string()
          .trim()
          .matches(
            /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
            "Invalid postal code"
          )
          .required("Postal Code is required"),
      });
    case "vendor_payment_setup":
      return Yup.object().shape({
        account_holder_name: Yup.string()
          .transform((value) => value.trim()) // This will remove leading and trailing spaces
          .matches(
            /^[A-Za-z]/,
            "Account holder name should not start with a number or special character"
          )
          .min(2, "Account Holder Name is too short")
          .required("Account Holder Name is required"),
        routing_number: Yup.string()
          .matches(
            /^(\d{5}-\d{3}|\d{9})$/,
            "Routing Number must be either in the format XXXXX-YYY or a 9-digit number, containing only numbers"
          )
          .required("Routing Number is required"),
        account_number: Yup.string()
          .matches(/^\d{12}$/, "Account Number must be exactly 12 digits")
          .required("Account Number is required"),
      });
    case "vendor_check_email":
      return Yup.object().shape({
        // email_code: Yup.string()
        //   .trim()
        //   .matches(/^[0-9]{4}$/, "Email OTP must be exactly 4 digits")
        //   .required("Email OTP is required"),
        mobile_code: Yup.string()
          .trim()
          .matches(/^[0-9]{4}$/, "Mobile OTP must be exactly 4 digits")
          .required("Mobile OTP is required"),
      });
    case "second_step":
      return Yup.object().shape({
        date: Yup.array()
          .of(
            Yup.object().shape({
              selected_date: Yup.string().required("Date is required."),
              shifts: Yup.array()
                .min(1, "Please choose at least one shift for this date.")
                .required("Shifts are required."),
            })
          )
          .required("Please select at least one date.")
          .min(1, "Please select at least one date."), // At least one date should be selected
        time: Yup.string(),
      });
    case "third_step":
      return Yup.object().shape({
        description: Yup.string().required("Description is required"),
        images: Yup.array()
          .of(
            Yup.object().shape({
              url: Yup.string()
                .url("Invalid URL")
                .required("Image URL is required"),
              caption: Yup.string().optional(), // Caption is optional
            })
          )
          .nullable() // Makes the entire array optional
          .notRequired(), // The array itself is not required
      });
    case "last_step":
      return Yup.object().shape({
        cardDetails: Yup.object()
          .shape({
            brand: Yup.string().required("Card brand is required"),
            complete: Yup.boolean()
              .oneOf([true], "Please complete the card details")
              .required("Card details are required"),
            expiryMonth: Yup.number()
              .min(1, "Invalid month")
              .max(12, "Invalid month")
              .required("Expiry month is required"),
            expiryYear: Yup.number()
              .min(new Date().getFullYear() % 100, "Year is in the past")
              .required("Expiry year is required"),
            last4: Yup.string()
              .length(4, "Invalid card number")
              .required("Card number is required"),
            validCVC: Yup.string()
              .oneOf(["Valid"], "Invalid CVC")
              .required("CVC is required"),
            validExpiryDate: Yup.string()
              .oneOf(["Valid"], "Invalid expiry date")
              .required("Expiry date is required"),
            validNumber: Yup.string()
              .oneOf(["Valid"], "Invalid card number")
              .required("Card number is required"),
          })
          .required("Please enter the card details"),
      });
    case "dates_selection":
      return Yup.object().shape({
        shift: Yup.array()
          .of(
            Yup.string().oneOf(
              ["Morning", "Afternoon", "Evening"],
              "Invalid shift value"
            )
          )
          .min(1, "Please select at least one time period.")
          .max(3, "You can select a maximum of three shifts.")
          .required("Please select at least one time period."),
      });
    case "vendor_date_shift_selection":
      return Yup.object().shape({
        date: Yup.string().required("Date is required. Please select a date."),
        shift: Yup.string().required(
          "Shift is required. Please select a shift."
        ),
      });
    default:
      return Yup.object(); // No validation for unknown forms
  }
};


export const vendorValidationsSchema = (type) => {
  const commonFields = {
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    services: Yup.array().min(1, "Select at least one service"),
    cities: Yup.array().min(1, "Select at least one city"),
  };

  if (type === "signup") {
    return Yup.object().shape({
      ...commonFields,
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
  }

  if (type === "vendorEdit") {
    return Yup.object().shape(commonFields);
  }

  return Yup.object().shape(commonFields);
};