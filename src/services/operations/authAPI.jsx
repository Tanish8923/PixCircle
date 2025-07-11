/* eslint-disable no-unused-vars */
import { toast } from "react-hot-toast"
// import { setLoading, setToken } from "../../slices/authSlice"
import { setToken } from "../../slices/authSlice"
import { getProfileDetails , updateProfilePhoto} from "./profileAPI"
// import { resetCart } from "../../slices/cartSlice"
import { setGeneratedProfilePicture } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

import Skeleton from 'react-loading-skeleton'

const {
  // SENDOTP_API,
  VERIFY_SIGNUP_API,
  SIGNUP_API,
  LOGIN_API,
  RESEND_SIGNUP_OTP_API,
  RESETPASSOTP_API,
  RESEND_RESET_OTP_API,
  VERIFY_RESET_OTP_API, 
  // RESETPASSWORD_API,
  GET_ALL_PREFERENCES_API,
  LOGOUT_API,
} = endpoints

export function verifyEmail(email, otp, switchView) {
  return async () => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    // switchView('verifyEmail')
    try {
      // console.log("Sending OTP to email:", email)
      console.log("OTP in verifyEmail function:", otp)
      const response = await apiConnector("POST", VERIFY_SIGNUP_API , {
        email,otp,
        // checkUserPresent: true,
      })
      console.log("SEND OTP API RESPONSE............", response)

      // console.log(response.data.success)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      toast.success("Signup Successfull! Login to Continue")
      // navigate("/verify-email")
      switchView('login')
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("OTP not valid or expired")
    }
    // dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUpAndSendOtp(
  // // accountType,
  // firstName,
  // lastName,
  // email,
  // password,
  // // confirmPassword,
  // userName,
  // selectedPrefs,
  // switchView,
  // // otp,
  // // navigate
  signupData,
  switchView
) {
  return async () => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        
  username: signupData.userName,
  email: signupData.email,
  password: signupData.password,
  firstName: signupData.firstName,
  lastName: signupData.lastName,
  preferences: signupData.selectedPrefs,
        // signupData,
        // accountType,
        // firstName,
        // lastName,
        // email,
        // password,
        // // confirmPassword,
        // userName,
        // selectedPrefs,
        // // otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }
      toast.success("OTP Sent Successfully")
      // navigate("/login")
      switchView('verifyEmail')
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      // navigate("/signup")
      // switchView('signup')
    }
    // dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function resendSignupOtp(email) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      // console.log("Resending OTP to email:", email)
      const response = await apiConnector("POST", RESEND_SIGNUP_OTP_API, {
        email,
      })
      console.log("RESEND OTP API RESPONSE............", response)

      toast.success("OTP Resend Successfully")
    } catch (error) {
      console.log("RESEND OTP API ERROR............", error)
      toast.error("Could Not Resend OTP")
    }
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    try {
      // 1. Call login API
      const response = await apiConnector("POST", LOGIN_API, {
        username: email, 
        password,
      })

      if (response.status < 200 || response.status >= 300) {
      throw new Error(`API Error: ${response.status}`);
    }

      // console.log("LOGIN API RESPONSE............", response)

      // 2. Save token to Redux and localStorage
      dispatch(setToken(response.data.token))
      localStorage.setItem("token", response.data.token);

      // 3. Fetch user profile details using token
      dispatch(getProfileDetails(navigate));

      // 4. Generate avatar using first and last name

      // const generateAvatarURL = (firstName, lastName) => {
      //   console.log("Generating avatar for:", firstName, lastName);
      //   const fullName = `${firstName}+${lastName}`;
      //   return `https://ui-avatars.com/api/?name=${fullName}&background=random`;
      // };

      // const profileImage = generateAvatarURL(response.data.firstName, response.data.lastName);
      // console.log("Generated Profile Image URL:", profileImage);

      // const urlToFile = async (profileImage, filename = "profile.jpg") => {
      //   const res = await fetch(profileImage);
      //   const blob = await res.blob();
      //   return new File([blob], filename, { type: blob.type });
      // };
      // const imageFile = await urlToFile(profileImage);

      // const profileObj = { username: "abdulwajih" }; // 👈 Your profile data
      // const formData = new FormData();
      // formData.append("profile", JSON.stringify({username:response.data.username})); // as string
      // formData.append("profilePicture", imageFile); // as file

      // dispatch(updateProfilePhoto(navigate, formData)); 

      // dispatch(setGeneratedProfilePicture(profileImage));

      // localStorage.setItem("profileImage", profileImage);



      // 5. Redirect
      navigate("/feed")
      toast.success("Logged in successfully")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    // dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetOTP(email, switchView) {
  return async () => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSOTP_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      toast.success("Reset Otp Sent")
      // setEmailSent(true)
      switchView('resetPassword')
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    // dispatch(setLoading(false))
  }
}

export function resendResetOtp(email) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      // console.log("Resending OTP to email:", email)
      const response = await apiConnector("POST", RESEND_RESET_OTP_API, {
        email,
      })
      console.log("RESEND OTP API RESPONSE............", response)

      toast.success("OTP Resend Successfully")
    } catch (error) {
      console.log("RESEND OTP API ERROR............", error)
      toast.error("Could Not Resend OTP")
    }
    toast.dismiss(toastId)
  }
}

export function verifyResetOtpAndChangePassword(email, otp, newPassword , switchView) {
  return async () => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    // switchView('verifyEmail')
    try {
      // console.log("Sending OTP to email:", email)
      console.log("OTP in verifyEmail function:", otp)
      const response = await apiConnector("POST", VERIFY_RESET_OTP_API , {
        email,otp,newPassword
        // checkUserPresent: true,
      })
      // console.log("SEND OTP API RESPONSE............", response)

      // console.log(response.data.success)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      toast.success("Password Updated Successfully! Login to Continue")
      // navigate("/verify-email")
      switchView('login')
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("OTP not valid or expired")
    }
    // dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging out...");
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");

      const response = await apiConnector("POST", LOGOUT_API, {}, {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      });

      dispatch(setToken(null));
      localStorage.removeItem("token");

      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // toast.error("Logout failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
}


export function fetchPreferences() {
  return async () => {
    try {
      const response = await apiConnector("GET", GET_ALL_PREFERENCES_API)
      // console.log("FETCH PREFERENCES RESPONSE............", response)

      const prefs = response?.data

      if (!Array.isArray(prefs)) {
        throw new Error("Unexpected response format")
      }
  
      return prefs
    } catch (error) {
      console.log("FETCH PREFERENCES ERROR............", error)
      toast.error("Failed to fetch preferences")
      return []
    }
  }
}
