import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
  loading: false,
  error: null,
  generatedProfilePicture: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state, action) {
      state.profileData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setGeneratedProfilePicture(state, action) {
      state.generatedProfilePicture = action.payload;
    },
    clearProfile(state) {
      state.profileData = null;
      state.loading = false;
      state.error = null;
      state.generatedProfilePicture = null;
    },
    updateFollowingList(state, action) {
      const { username, isFollowing } = action.payload;
      if (!state.profileData?.data) return;
      const followingArray = state.profileData.data.following || [];

      if (isFollowing && !followingArray.includes(username)) {
        followingArray.push(username);
      } else if (!isFollowing) {
        state.profileData.data.following = followingArray.filter(u => u !== username);
      }
    },
  },
});

export const {
  setProfileData,
  setLoading,
  setError,
  setGeneratedProfilePicture,
  clearProfile,
  updateFollowingList,
} = profileSlice.actions;

export default profileSlice.reducer;
