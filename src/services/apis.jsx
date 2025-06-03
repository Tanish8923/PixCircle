const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
console.log("BASE_URL", BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  // SENDOTP_API: BASE_URL + "/auth/sendotp",
  VERIFY_SIGNUP_API: BASE_URL + "/auth/verify-signup",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/signin",
  RESEND_SIGNUP_OTP_API: BASE_URL + "/auth/resend-signup-otp",
  RESETPASSOTP_API: BASE_URL + "/auth/reset-password",
  RESEND_RESET_OTP_API: BASE_URL + "/auth/resend-reset-password-otp",
  VERIFY_RESET_OTP_API: BASE_URL + "/auth/verify-reset-password",
  LOGOUT_API: BASE_URL + "/auth/logout",
  // RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  GET_ALL_PREFERENCES_API: BASE_URL + "/preferences",
}

export const profileEndpoints = {
  USER_DETAILS_API: BASE_URL + "/user/profile",
}

export const imageEndpoints = {
  IMAGE_UPLOAD_API: BASE_URL + "/images/upload",
  HOME_IMAGES_RECOMMEND_API: BASE_URL + "/images/recommend" ,
  FEED_IMAGES_RECOMMEND_API: BASE_URL + "/images/feed" ,
}

export const followEndpoints = {
  FOLLOW_BASE_API: BASE_URL + "/follow"
};

export const likesEndpoints = {
  IMAGE_LIKE_API: BASE_URL + "/likes/like",
  IMAGE_UNLIKE_API: BASE_URL + "/likes/unlike"
};

export const searchEndpoints = {
  GET_ALL_USERS_API: BASE_URL + "/users",
  SEARCH_USER_BY_USERNAME_API: BASE_URL + "/users/searchByUsername",
};