import { useEffect, useState } from 'react';
import ImagePost from './ImagePost';
import { feedImageRecommend } from '../services/operations/imageAPI'; // make sure this exists
import { useSelector, useDispatch } from 'react-redux';
import {getFollowing} from '../services/operations/followAPI'; // make sure this exists
const FollowingFeed = () => {
  const profile = useSelector((state) => state.profile.profileData);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    if (!profile?.data?.id) return;

    const fetchData = async () => {
      try {
        // Fetch recommended images
        const homeImagesData = await dispatch(feedImageRecommend(profile.data.id));
        if (homeImagesData?.data && Array.isArray(homeImagesData.data)) {
          setPosts(homeImagesData.data);
        } else {
          setPosts([]);
        }

        // Fetch followed users
        const followData = await getFollowing(profile.data.username); // returns the API array you shared
        if (Array.isArray(followData)) {
          setFollowedUsers(followData);
        } else {
          setFollowedUsers([]);
        }

      } catch (error) {
        console.error('Error in home feed fetch:', error);
      }
    };

    fetchData();
  }, [profile, dispatch]);

  return (
    <div>
      {(!Array.isArray(posts) || posts.length === 0) ? (
        <p className="text-center text-gray-500">No posts to display</p>
      ) : (
        posts.map((post) => (
          <ImagePost
            key={post.id}
            username={post.username}
            userImage={post.imageUrl}
            postImage={post.imageUrl}
            followedUsers={followedUsers}
            likeCount={post.likeCount}
            postId={post.id}
            likedByUsernames={post.likedByUsernames}
          />
        ))
      )}
    </div>
  );
};

export default FollowingFeed;
// import React from 'react';

// const FollowingFeed = () => {
//   return <div>Following Feed (coming soon...)</div>;
// };

// export default FollowingFeed;