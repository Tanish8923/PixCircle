import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { likesEndpoints } from "../apis"

const {
  IMAGE_LIKE_API,
  IMAGE_UNLIKE_API,
} = likesEndpoints

export function likeImage(userId, imageId) {
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");

      const response = await apiConnector("POST", IMAGE_LIKE_API, {}, {
        Authorization: `Bearer ${token}`,
      }, {
        userId,
        imageId,
      });

      toast.success(response.data.message );
      return response.data; // ✅ return response here
    } catch (error) {
      console.error("IMAGE_LIKE_API ERROR", error);
      toast.error("Could not like image");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function unlikeImage(userId, imageId) {
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");

      const response = await apiConnector("POST", IMAGE_UNLIKE_API, {}, {
        Authorization: `Bearer ${token}`,
      }, {
        userId,
        imageId,
      });

      toast.success("Image unliked successfully");
      return response.data; // ✅ return response here
    } catch (error) {
      console.error("IMAGE_UNLIKE_API ERROR", error);
      toast.error("Could not unlike image");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
}
