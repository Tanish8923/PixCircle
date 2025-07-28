/* eslint-disable no-unused-vars */
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { imageEndpoints } from "../apis"
import { profileEndpoints } from "../apis"
import { setProfileData } from "../../slices/profileSlice"

const {
  IMAGE_UPLOAD_API,
  HOME_IMAGES_RECOMMEND_API,
  FEED_IMAGES_RECOMMEND_API
} = imageEndpoints

const {
  USER_DETAILS_API,
} = profileEndpoints

export function uploadImage(tag , image , userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading...")
    const formData = new FormData();
    formData.append("image", image);
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");
      const response = await apiConnector("POST", IMAGE_UPLOAD_API, formData, {
        "Authorization": `Bearer ${token}`,
      },{
          tag: tag[0],
          userId: userId,
        })
      
      // console.log("IMAGE_UPLOAD_API RESPONSE............", response)
      const updatedProfile = await apiConnector("GET", USER_DETAILS_API, {}, {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },)
      // console.log("GET_USER_DETAILS API RESPONSE............", updatedProfile)
    
      dispatch(setProfileData(updatedProfile));
      toast.success("Image Uploaded Successfully")

    } catch (error) {
        console.log("IMAGE_UPLOAD_API ERROR............", error)
        toast.error("Could Not Upload Image")
    }
    toast.dismiss(toastId)
  }
}

export function homeImageRecommend(userId) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");
      const response = await apiConnector("GET", HOME_IMAGES_RECOMMEND_API, {} , {
        "Authorization": `Bearer ${token}`,
      }, {
          userId: userId,
        })
      
    // console.log("Home Image Recommend............", response)
    return response; 

    } catch (error) {
        console.log("IMAGE_UPLOAD_API ERROR............", error)
        toast.error("Could Not Upload Image")
    }
  }
}

export function feedImageRecommend(userId) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");
      const response = await apiConnector("GET", FEED_IMAGES_RECOMMEND_API, {} , {
        "Authorization": `Bearer ${token}`,
      }, {
          userId: userId,
        })
      
    // console.log("Feed  Image Recommend............", response)
    return response; 

    } catch (error) {
        console.log("IMAGE_UPLOAD_API ERROR............", error)
        toast.error("Could Not Upload Image")
    }
  }
}