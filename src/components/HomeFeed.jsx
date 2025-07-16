/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ImagePost from './ImagePost';
import { homeImageRecommend } from '../services/operations/imageAPI';
import { useSelector, useDispatch } from 'react-redux';
import {getFollowing} from '../services/operations/followAPI';
import ImagePostSkeleton from './skeletons/ImagePostSkeleton';
const HomeFeed = () => {
  const profile = useSelector((state) => state.profile.profileData);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!profile?.data?.id) return;

    const fetchData = async () => {
      try {

        setIsLoading(true); 
        // Fetch recommended images
        const homeImagesData = await dispatch(homeImageRecommend(profile.data.id));
        if (homeImagesData?.data && Array.isArray(homeImagesData.data)) {
          setPosts(homeImagesData.data);
          // console.log("Home Image Recommend............", homeImagesData.data);
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
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [profile]);

  return (
    <div>
        {isLoading ? (
          // show 3 loading skeletons
          [...Array(3)].map((_, i) => <ImagePostSkeleton key={i} />)
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts to display</p>
        ) : (
          posts.map((post) => (
            <ImagePost
              key={post.id}
              username={post.username}
              userImage={post.profilePictureUrl}
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

export default HomeFeed;