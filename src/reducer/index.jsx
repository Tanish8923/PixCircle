import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import suggestedUsersReducer from "../slices/suggestedUsersSlice"
import postsReducer from "../slices/postsSlice"
import followedUsersReducer from "../slices/followedUsersSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  suggestedUsers: suggestedUsersReducer,
  followedUsers: followedUsersReducer,
  posts: postsReducer,
})

export default rootReducer