import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import suggestedUsersReducer from "../slices/suggestedUsersSlice"
import postsReducer from "../slices/postsSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  suggestedUsers: suggestedUsersReducer,
  posts: postsReducer,
})

export default rootReducer