import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../services/operations/followAPI';
import { setSuggestedUsers } from '../slices/suggestedUsersSlice';
import { addFollowedUser } from '../slices/followedUsersSlice';

const RightSidebar = ({ setActiveSection, setSelectedUser }) => {
  const [showAll, setShowAll] = useState(false);
  const { suggestedUsers } = useSelector((state) => state.suggestedUsers);
  const profile = useSelector((state) => state.profile.profileData);
  const dispatch = useDispatch();

  const visibleUsers = showAll ? suggestedUsers : suggestedUsers.slice(0, 2);

  const handleFollow = async (username, id) => {
    if (!profile?.data?.username) return;

    // Save previous state for rollback
    const previousUsers = [...suggestedUsers];

    // Optimistic update in Redux
    const updatedUsers = suggestedUsers.filter((user) => user.id !== id);
    dispatch(setSuggestedUsers(updatedUsers)); // Remove from suggestions
    dispatch(addFollowedUser({username})); // Add to followed users (for sync)

    try {
      const res = await dispatch(followUser(profile.data.username, username));

      if (!res?.success) {
        throw new Error("Follow failed");
      }
    } catch (error) {
      console.error("Follow error:", error);
      // Rollback
      dispatch(setSuggestedUsers(previousUsers));
    }
  };

  const openProfile = (user) => {
    setSelectedUser(user);
    setActiveSection("datailedUserProfile");
  };

  return (
    <div className="hidden lg:block w-96 p-12 border-l border-gray-500 text-black">
      <div className="flex justify-between mb-9">
        <p className="text-sm text-gray-500">Suggested for you</p>
      </div>

      <div className="flex flex-col gap-4">
        {suggestedUsers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            No suggestions available right now.
          </p>
        ) : (
          <>
            {visibleUsers.map((user) => (
              <div key={user.id} className="flex justify-between items-center">
                <div onClick={() => openProfile(user)} className="flex items-center gap-3 cursor-pointer">
                  <img
                    src={user.profilePictureUrl}
                    className="w-9 h-9 rounded-full"
                    alt={user.username}
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(user.username, user.id)}
                  className="text-sm font-semibold text-blue-500 cursor-pointer"
                >
                  Follow
                </button>
              </div>
            ))}
          </>
        )}

        {suggestedUsers.length > 2 && (
          <button
            className="text-sm text-black font-semibold mx-auto cursor-pointer mt-4 self-start"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'See All'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;