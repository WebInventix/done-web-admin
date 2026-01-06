export const type_constant = {
  PROVIDER: "provider",
  APPLICANT: "applicant",
  GET_ALL_COUPONS_ASYNC: "coupons/getAllCouponsAsync",
  GET_COUPON_BY_ID_ASYNC: "coupons/getCouponByIdAsync", 
  CREATE_COUPON_ASYNC: "coupons/createCouponAsync",
  UPDATE_COUPON_ASYNC: "coupons/updateCouponAsync",
  DELETE_COUPON_ASYNC: "coupons/deleteCouponAsync",

};

// export const url = ''

export const api_error_messages_to_exit = [
  "Token is not valid",
  "Refresh or Access Token is not valid",
  "Token is Expired",
  "Invalid token",
];

export const role_constant = {
  ADMIN: 1,
  VENDOR: 2,
  USER: 3,
};


export const session_expired = "@session_expired";

export const save_tokens_constant = "@usertokens";

export const signup_methods_constants = {
  EMAIL_PASSWORD: "email_password",
  GOOGLE: "google",
  FACEBOOK: "facebook",
  APPLE: "apple",
};

export const SERVICE_BOOKING_KEYS = {
  LOCATION: "location",
  SERVICE: "service",
  DATE: "date",
  DESCRIPTION: "description",
  IMAGES: "images",
  TIME: "time",
  STRIPETOKEN: "stripeToken",
  PRICE: "price",
};