import { toast } from "react-hot-toast"

import { setProfileData } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  USER_DETAILS_API,
} = profileEndpoints

export function getProfileDetails(navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // removes quotes if present
      if (!token) throw new Error("No token found");
      const response = await apiConnector("GET", USER_DETAILS_API, {}, {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },)
      // console.log("GET_USER_DETAILS API RESPONSE............", response)

      dispatch(setProfileData(response));

    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    // toast.dismiss(toastId)
  }
}

export function updateProfilePhoto(navigate , formData) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // removes quotes if present
      if (!token) throw new Error("No token found");
      const response = await apiConnector("PUT", USER_DETAILS_API, formData , {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },)
      console.log("UPDATED_USER_DETAILS API RESPONSE............", response)

    //   const data = await response.json();
      dispatch(setProfileData(response));

    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Update User Details")
    }
    // toast.dismiss(toastId)
  }
}

export function updateProfileDetails(setActiveSection , formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // removes quotes if present
      if (!token) throw new Error("No token found");
      const response = await apiConnector("PUT", USER_DETAILS_API, formData , {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },)
      // console.log("UPDATED_USER_DETAILS API RESPONSE............", response)

      dispatch(setProfileData(response));
      toast.success("User Details Updated Successfully")
      setActiveSection("profile") // Navigate back to profile section after update
    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Update User Details")
    }
    toast.dismiss(toastId)
  }
}
