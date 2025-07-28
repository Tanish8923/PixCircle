import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followedUsers: [], // store usernames of users you follow
};

const followedUsersSlice = createSlice({
  name: "followedUsers",
  initialState,
  reducers: {
    setFollowedUsers(state, action) {
      state.followedUsers = action.payload; // on initial load
    },
    addFollowedUser(state, action) {
      if (!state.followedUsers.includes(action.payload)) {
        state.followedUsers.push(action.payload);
      }
    },
    removeFollowedUser(state, action) {
      state.followedUsers = state.followedUsers.filter(
         (u) => u.username !== action.payload
      );
    },
  },
});

export const { setFollowedUsers, addFollowedUser, removeFollowedUser } = followedUsersSlice.actions;
export default followedUsersSlice.reducer;
