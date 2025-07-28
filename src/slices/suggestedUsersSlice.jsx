import { createSlice } from "@reduxjs/toolkit";

const suggestedUsersSlice = createSlice({
  name: "suggestedUsers",
  initialState: {
    suggestedUsers: [],
  },
  reducers: {
    setSuggestedUsers(state, action) {
      state.suggestedUsers = action.payload;
    },
    removeSuggestedUser(state, action) {
      state.suggestedUsers = state.suggestedUsers.filter(
        (user) => user.username !== action.payload
      );
    },
  },
});

export const { setSuggestedUsers, removeSuggestedUser} = suggestedUsersSlice.actions;
export default suggestedUsersSlice.reducer;