import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state, action) {
      state.profileData = action.payload;
    },
  },
});

export const {
  setProfileData,
} = profileSlice.actions;

export default profileSlice.reducer;
