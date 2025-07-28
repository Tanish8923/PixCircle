import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { followUser, unfollowUser } from '../services/operations/followAPI';
import { likeImage, unlikeImage } from '../services/operations/likesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addFollowedUser, removeFollowedUser } from "../slices/followedUsersSlice";
import { removeSuggestedUser } from "../slices/suggestedUsersSlice";

const ImagePost = ({ userImage, username, postImage, likeCount: initialCount, postId, likedByUsernames }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const followedUsers = useSelector((state) => state.followedUsers.followedUsers);

  const userId = profile?.data?.id;
  const authUsername = profile?.data?.username;

  // Local state for instant UI change
  const [localFollowing, setLocalFollowing] = useState(false);

  // Sync local state with Redux whenever followedUsers changes
  useEffect(() => {
    const followingFromRedux = followedUsers.some(u => u.username === username);
    setLocalFollowing(followingFromRedux);
  }, [followedUsers, username]);

  // Handle Like Status
  useEffect(() => {
    if (authUsername && Array.isArray(likedByUsernames)) {
      setLiked(likedByUsernames.includes(authUsername));
    }
  }, [authUsername, likedByUsernames]);

  // Toggle Like
  const toggleLike = async () => {
    if (!userId || !postId) return;

    const previousLiked = liked;
    const previousCount = likeCount;

    setLiked(!liked);
    setLikeCount(prev => liked ? Math.max(0, prev - 1) : prev + 1);

    try {
      if (!previousLiked) {
        const res = await dispatch(likeImage(userId, postId));
        if (res?.message !== "Liked successfully") throw new Error("Like failed");
      } else {
        const res = await dispatch(unlikeImage(userId, postId));
        if (res?.message !== "Unliked successfully") throw new Error("Unlike failed");
      }
    } catch (err) {
      setLiked(previousLiked);
      setLikeCount(previousCount);
      console.error("Like/unlike error", err);
    }
  };

  // Toggle Follow with Instant UI
  const toggleFollow = async () => {
    if (!profile?.data?.username || !username) return;

    const previousState = localFollowing;
    setLocalFollowing(!previousState); // Instant UI update

    // Optimistic Redux update
    if (!previousState) {
      dispatch(addFollowedUser({ username })); // full object if needed
      dispatch(removeSuggestedUser(username));
    } else {
      dispatch(removeFollowedUser(username));
    }

    try {
      const res = previousState
        ? await dispatch(unfollowUser(profile.data.username, username))
        : await dispatch(followUser(profile.data.username, username));

      if (!res.success) throw new Error("API failed");
    } catch (error) {
      console.error("Follow/unfollow error:", error);
      setLocalFollowing(previousState); // Rollback UI
      if (!previousState) {
        dispatch(removeFollowedUser(username));
      } else {
        dispatch(addFollowedUser({ username }));
        dispatch(removeSuggestedUser(username));
      }
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <img src={userImage} alt="User" className="w-10 h-10 rounded-full object-cover" />
        <span className="font-semibold">{username}</span>
        <button
          onClick={toggleFollow}
          className={`ml-auto text-sm font-medium cursor-pointer ${
            localFollowing ? 'text-gray-500' : 'text-blue-500'
          }`}
        >
          {localFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
      <div className="w-full aspect-[5/5] overflow-hidden rounded relative">
        <img src={postImage} alt="Post" className="w-full h-full object-cover" />
      </div>
      <div
        onClick={toggleLike}
        className="flex items-center gap-2 mt-3 text-xl text-red-500 cursor-pointer"
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
        <span className="text-black text-base">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
      </div>
    </div>
  );
};

export default ImagePost;