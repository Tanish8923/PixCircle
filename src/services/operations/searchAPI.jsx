import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { searchEndpoints } from "../apis";

const {
  GET_ALL_USERS_API,
  SEARCH_USER_BY_USERNAME_API,
} = searchEndpoints;

export function getAllUsers() {
  return async () => {
    // const toastId = toast.loading("Loading...");
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");

      const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      // console.log("GET_ALL_USERS_API RESPONSE............", response);
      return response.data;
    } catch (error) {
      console.log("GET_ALL_USERS_API ERROR............", error);
      toast.error("Could not fetch users");
    } finally {
      // toast.dismiss(toastId);
    }
  };
}

export function searchByUsername(username) {
  return async () => {
    const toastId = toast.loading("Searching...");
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) throw new Error("No token found");

      const response = await apiConnector(
        "GET",
        SEARCH_USER_BY_USERNAME_API ,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        { username }
      );

      // console.log("Searched users are............", response);
      return response.data;
    } catch (error) {
      console.log("SEARCH_USER_BY_USERNAME_API ERROR............", error);
      toast.error("Could not search users");
    } finally {
      toast.dismiss(toastId);
    }
  };
}