/* eslint-disable no-unused-vars */
import { toast } from "react-hot-toast"
import { setToken } from "../../slices/authSlice"
import { getProfileDetails , updateProfilePhoto} from "./profileAPI"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"


const {
  VERIFY_SIGNUP_API,
  SIGNUP_API,
  LOGIN_API,
  RESEND_SIGNUP_OTP_API,
  RESETPASSOTP_API,
  RESEND_RESET_OTP_API,
  VERIFY_RESET_OTP_API, 
  GET_ALL_PREFERENCES_API,
  LOGOUT_API,
} = endpoints

export function verifyEmail(email, otp, switchView) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      // console.log("Sending OTP to email:", email)
      console.log("OTP in verifyEmail function:", otp)
      const response = await apiConnector("POST", VERIFY_SIGNUP_API , {
        email,otp,
      })
      console.log("SEND OTP API RESPONSE............", response)
      toast.success("Signup Successfull! Login to Continue")
      switchView('login')
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("OTP not valid or expired")
    }
    toast.dismiss(toastId)
  }
}

export function signUpAndSendOtp(
  signupData,
  switchView
) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", SIGNUP_API, {        
                                                                username: signupData.userName,
                                                                email: signupData.email,
                                                                password: signupData.password,
                                                                firstName: signupData.firstName,
                                                                lastName: signupData.lastName,
                                                                preferences: signupData.selectedPrefs,        
                                                                })

      console.log("SIGNUP API RESPONSE............", response)
      toast.success("OTP Sent Successfully")
      switchView('verifyEmail')
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
    }
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

      // 4. Redirect
      navigate("/feed")
      toast.success("Logged in successfully")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    toast.dismiss(toastId)
  }
}

export function getPasswordResetOTP(email, switchView) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", RESETPASSOTP_API, {
        email,
      })

      // console.log("RESETPASSTOKEN RESPONSE............", response)

      toast.success("Reset Otp Sent")
      switchView('resetPassword')
    } catch (error) {
      // console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
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
      // console.log("RESEND OTP API RESPONSE............", response)

      toast.success("OTP Resend Successfully")
    } catch (error) {
      // console.log("RESEND OTP API ERROR............", error)
      toast.error("Could Not Resend OTP")
    }
    toast.dismiss(toastId)
  }
}

export function verifyResetOtpAndChangePassword(email, otp, newPassword , switchView) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      // console.log("Sending OTP to email:", email)
      console.log("OTP in verifyEmail function:", otp)
      const response = await apiConnector("POST", VERIFY_RESET_OTP_API , {
        email,otp,newPassword
      })
      // console.log("SEND OTP API RESPONSE............", response)
      toast.success("Password Updated Successfully! Login to Continue")
      switchView('login')
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("OTP not valid or expired")
    }
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
