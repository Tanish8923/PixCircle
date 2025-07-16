import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestedUsers: [],
  removedUserBackup: null,
};

const suggestedUsersSlice = createSlice({
  name: "suggestedUsers",
  initialState,
  reducers: {
    setSuggestedUsers(state, action) {
      state.suggestedUsers = action.payload;
    },
    removeUser(state, action) {
      const username = action.payload;
      const userToRemove = state.suggestedUsers.find(u => u.username === username);
      if (userToRemove) {
        state.removedUserBackup = userToRemove;
        state.suggestedUsers = state.suggestedUsers.filter(u => u.username !== username);
      }
    },
    addUserBack(state) {
      if (state.removedUserBackup) {
        state.suggestedUsers.unshift(state.removedUserBackup);
        state.removedUserBackup = null;
      }
    },
    updateSuggestedFollowStatus(state, action) {
      const { username, isFollowing, removeOnFollow } = action.payload;
      if (removeOnFollow && isFollowing) {
        state.suggestedUsers = state.suggestedUsers.filter(user => user.username !== username);
      } else {
        state.suggestedUsers = state.suggestedUsers.map(user =>
          user.username === username ? { ...user, isFollowing } : user
        );
      }
    }
  }
});

export const { setSuggestedUsers, removeUser, addUserBack, updateSuggestedFollowStatus } = suggestedUsersSlice.actions;
export default suggestedUsersSlice.reducer;
