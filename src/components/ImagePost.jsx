import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { followUser, unfollowUser } from '../services/operations/followAPI';
import { likeImage , unlikeImage} from '../services/operations/likesAPI'; // ✅ import here
import { useDispatch, useSelector } from 'react-redux';

const ImagePost = ({ userImage, username, postImage, followedUsers, likeCount: initialCount, postId , likedByUsernames }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [following, setFollowing] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  // console.log("Profile data in ImagePost component:", likedByUsernames);

  const userId = profile?.data?.id; 
  const authUsername = profile?.data?.username; // Get the current user's username
  // console.log("Current user's username:", authUsername);

  useEffect(() => {
  if (authUsername && Array.isArray(likedByUsernames)) {
    setLiked(likedByUsernames.includes(authUsername));
  }
}, [authUsername, likedByUsernames]);

  useEffect(() => {
    const isFollowing = followedUsers?.some(user => user.username === username);
    setFollowing(isFollowing);
  }, [followedUsers, username]);

  const toggleLike = async () => {
    
    if (!userId || !postId) return;
  
    // Optimistic update
    const previousLiked = liked;
    const previousCount = likeCount;
  
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    }
  
    try {
      if (!previousLiked) {
        const res = await dispatch(likeImage(userId, postId));
        if (res?.message !== "Liked successfully") {
          throw new Error("Like failed");
        }
      } else {
        const res = await dispatch(unlikeImage(userId, postId));
        if (res?.message !== "Unliked successfully") {
          throw new Error("Unlike failed");
        }
      }
    } catch (err) {
      console.error("Like/unlike error", err);
      // Revert UI if API fails
      setLiked(previousLiked);
      setLikeCount(previousCount);
    }
  };


  const toggleFollow = async () => {
  if (!profile?.data?.username || !username) return;

  const previousFollowing = following;
  setFollowing(!previousFollowing); // Optimistic update

  try {
    const res = previousFollowing
      ? await dispatch(unfollowUser(profile.data.username, username))
      : await dispatch(followUser(profile.data.username, username));

    if (!res.success) {
      throw new Error("API failed");
    }
  } catch (error) {
    console.error("Follow/unfollow error:", error);
    setFollowing(previousFollowing); // rollback if API fails
  }
};


  return (
    <div className="bg-white shadow p-4 rounded mb-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={userImage}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-semibold">{username}</span>
        <button
          onClick={toggleFollow}
          className={`ml-auto text-sm font-medium cursor-pointer ${
            following ? 'text-gray-500' : 'text-blue-500'
          }`}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </div>

      {/* Image */}
      <div
        className="w-full aspect-[5/5] overflow-hidden rounded relative"
      >
        <img
          src={postImage}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Like Section */}
      <div onClick={toggleLike} className="flex items-center gap-2 mt-3 text-xl text-red-500 cursor-pointer">
        {liked ? <FaHeart /> : <FaRegHeart />}
        <span className="text-black text-base">{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
      </div>
    </div>
  );
};

export default ImagePost;
