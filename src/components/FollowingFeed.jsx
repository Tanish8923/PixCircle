import { useEffect, useState } from 'react';
import ImagePost from './ImagePost';
import { feedImageRecommend } from '../services/operations/imageAPI';
import { useSelector, useDispatch } from 'react-redux';
import ImagePostSkeleton from './skeletons/ImagePostSkeleton';

const FollowingFeed = () => {
  const profile = useSelector((state) => state.profile.profileData);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get followed users from Redux (keeps it always updated)
  const followedUsers = useSelector((state) => state.followedUsers.followedUsers);

  useEffect(() => {
    if (!profile?.data?.id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const followingImagesData = await dispatch(feedImageRecommend(profile.data.id));

        if (followingImagesData?.data && Array.isArray(followingImagesData.data)) {
          setPosts(followingImagesData.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error in following feed fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [profile?.data?.id, profile?.data?.username , dispatch]);

  // Filter posts based on followed users in Redux
  const filteredPosts = posts.filter(post =>
    followedUsers.some(user => user.username === post.username)
  );

  return (
    <div>
      {isLoading ? (
        [...Array(3)].map((_, i) => <ImagePostSkeleton key={i} />)
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts to display</p>
      ) : (
        filteredPosts.map((post) => (
          <ImagePost
            key={post.id}
            username={post.username}
            userImage={post.profilePictureUrl}
            postImage={post.imageUrl}
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