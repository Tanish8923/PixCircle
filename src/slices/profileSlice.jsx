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
  },
});

export const { setProfileData, setLoading, setError,setGeneratedProfilePicture, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
