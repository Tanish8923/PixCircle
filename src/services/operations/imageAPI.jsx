/* eslint-disable no-unused-vars */
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { imageEndpoints } from "../apis"

const {
  IMAGE_UPLOAD_API,
  HOME_IMAGES_RECOMMEND_API,
  FEED_IMAGES_RECOMMEND_API
} = imageEndpoints

export function uploadImage(tag , image , userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    const formData = new FormData();
    formData.append("image", image);
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");
      const response = await apiConnector("POST", IMAGE_UPLOAD_API, formData, {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },{
          tag: tag[0],
          userId: userId,
        })
      
    console.log("IMAGE_UPLOAD_API RESPONSE............", response)
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
    const toastId = toast.loading("Loading...")
    // const formData = new FormData();
    // formData.append("userId", userId);
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");
      const response = await apiConnector("GET", HOME_IMAGES_RECOMMEND_API, {} , {
        // "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      }, {
          userId: userId,
        })
      
    // console.log("Home Image Recommend............", response)
    toast.dismiss(toastId)
    return response; 
    // toast.success("Image Uploaded Successfully")

    } catch (error) {
        console.log("IMAGE_UPLOAD_API ERROR............", error)
        toast.error("Could Not Upload Image")
        toast.dismiss(toastId)
    }
  }
}

export function feedImageRecommend(userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    // const formData = new FormData();
    // formData.append("userId", userId);
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");
      const response = await apiConnector("GET", FEED_IMAGES_RECOMMEND_API, {} , {
        // "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      }, {
          userId: userId,
        })

      toast.dismiss(toastId)
      
    // console.log("Home Image Recommend............", response)
    return response; 
    // toast.success("Image Uploaded Successfully")

    } catch (error) {
        console.log("IMAGE_UPLOAD_API ERROR............", error)
        toast.error("Could Not Upload Image")
        toast.dismiss(toastId)
    }
  }
}