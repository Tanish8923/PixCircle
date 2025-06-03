/* eslint-disable no-unused-vars */
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { followEndpoints } from "../apis";

const { FOLLOW_BASE_API } = followEndpoints;

export function followUser(followerUsername, followingUsername) {
  return async (dispatch) => {
    const toastId = toast.loading("Processing...");
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");

      const url = `${FOLLOW_BASE_API}/${followerUsername}/follow/${followingUsername}`;

      const response = await apiConnector("POST", url, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("FOLLOW RESPONSE", response);
      toast.success(`Successfully followed ${followingUsername}`);
    } catch (error) {
      console.error("FOLLOW ERROR", error);
      toast.error("Failed to follow user");
    }
    toast.dismiss(toastId);
  };
}

export function unfollowUser(followerUsername, followingUsername) {
  return async (dispatch) => {
    const toastId = toast.loading("Processing...");
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");

      const url = `${FOLLOW_BASE_API}/${followerUsername}/unfollow/${followingUsername}`;

      const response = await apiConnector("DELETE", url, null, {
        Authorization: `Bearer ${token}`,
      });

      // console.log("UNFOLLOW RESPONSE", response);
      toast.success(`Successfully unfollowed ${followingUsername}`);
    } catch (error) {
      console.error("UNFOLLOW ERROR", error);
      toast.error("Failed to unfollow user");
    }
    toast.dismiss(toastId);
  };
}

export async function getFollowers(userName) {
  try {
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    if (!token) throw new Error("No token found");

    const url = `${FOLLOW_BASE_API}/${userName}/followers`;

    const response = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("GET FOLLOWERS RESPONSE", response);
    return response.data;  
  } catch (error) {
    toast.error("Failed to fetch followers");
    console.error(error);
    throw error;
  }
}

export async function getFollowing(userName) {
  try {
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    if (!token) throw new Error("No token found");

    const url = `${FOLLOW_BASE_API}/${userName}/following`;

    const response = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("GET FOLLOWING RESPONSE", response);
    return response.data; // assuming response.data contains following array
  } catch (error) {
    toast.error("Failed to fetch following users");
    console.error(error);
    throw error;
  }
}