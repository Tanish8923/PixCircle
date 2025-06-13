import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../services/operations/followAPI';

const RightSidebar = ({ users: initialUsers , setActiveSection , setSelectedUser }) => {
  // console.log("Initial users in RightSidebar:", initialUsers);
  const [showAll, setShowAll] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(null); // for per-user loading state
  const [userList, setUserList] = useState([]); // local copy of suggested users
  // console.log("User list in RightSidebar:", userList);
  const profile = useSelector((state) => state.profile.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialUsers?.length) {
      setUserList(initialUsers);
    }
  }, [initialUsers]);

  const visibleUsers = showAll ? userList : userList?.slice(0, 2);

  const handleFollow = async (username, id) => {
    try {
      setLoadingUserId(id);
      await dispatch(followUser(profile.data.username, username));

      // Remove the followed user from the suggestion list
      const updatedList = userList.filter((user) => user.id !== id);
      setUserList(updatedList);
    } catch (error) {
      console.error("Follow error:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const openProfile = (user) => {
    setSelectedUser(user); 
    setActiveSection("datailedUserProfile");
  }

  return (
    <div className="hidden lg:block w-96 p-12 border-l border-gray-500 text-black">
      <div className="flex justify-between mb-9">
        <p className="text-sm text-gray-500">Suggested for you</p>
      </div>

      <div className="flex flex-col gap-4">
        {visibleUsers?.map((user) => (
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
              disabled={loadingUserId === user.id}
              className="text-sm font-semibold text-blue-500 cursor-pointer"
            >
              {loadingUserId === user.id ? "..." : "Follow"}
            </button>
          </div>
        ))}

        {userList?.length > 2 && (
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
