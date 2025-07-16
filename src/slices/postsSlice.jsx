import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    updatePostFollowStatus(state, action) {
      const { username, isFollowing } = action.payload;
      state.posts = state.posts.map(post =>
        post.username === username
          ? { ...post, isFollowing }
          : post
      );
    },
  },
});

export const { setPosts, updatePostFollowStatus } = postsSlice.actions;
export default postsSlice.reducer;
