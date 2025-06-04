import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../services/operations/followAPI';

const OtherUserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.profile.profileData?.data?.username);

  // Check if the current user has already followed the other user
  const isFollowingInitially = user?.likedByUsernames?.includes(currentUser);
  const [isFollowing, setIsFollowing] = useState(isFollowingInitially);
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await dispatch(unfollowUser(currentUser, user.username));
      } else {
        await dispatch(followUser(currentUser, user.username));
      }
      setIsFollowing(!isFollowing); // Toggle state
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black p-6">
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center justify-evenly">
          <img
            src={user.profilePictureUrl}
            alt="Profile"
            className="w-40 h-40 rounded-full border-2 border-gray-500 object-cover"
          />

          <div className="flex flex-col gap-5 items-start">
            <div className="flex gap-12 mt-2">
              <h2 className="mt-2 text-xl font-semibold">{user.username}</h2>
              <div className="flex gap-2">
                {currentUser !== user.username && (
                  <button
                    onClick={handleFollowToggle}
                    disabled={loading}
                    className={`px-3 py-1 rounded-md cursor-pointer font-medium ${
                      isFollowing
                        ? 'bg-gray-200 text-black'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {loading ? "..." : isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-6 mt-4 text-sm">
              <span>
                <strong>{Array.isArray(user.uploadedImages) && user.uploadedImages.length}</strong> posts
              </span>
              <span>
                <strong>{user.followersCount}</strong> followers
              </span>
              <span>
                <strong>{user.followingCount}</strong> following
              </span>
            </div>

            <div>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {user.bio || "No bio available"}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 w-[90%] mt-12 my-4" />

        <div className="flex justify-center gap-8 text-sm">
          <p className="border-b-2 border-blue-500 pb-2">POSTS</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {Array.isArray(user.uploadedImages) && user.uploadedImages.length > 0 ? (
            user.uploadedImages.map((image) => (
              <div key={image.id} className="w-full aspect-square">
                <img
                  src={image.imageUrl}
                  alt={image.filename}
                  className="w-full h-full object-cover rounded-md border"
                />
              </div>
            ))
          ) : (
            <p className="text-white">No images uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;

// import React from 'react'

// const OtherUserProfile = ({user}) => {
//     // console.log("User in OtherUserProfile:", user);
//   return (
//     <div className="min-h-screen  text-black p-6">
//       <div className="flex flex-col items-center">
//         <div className="flex w-full items-center justify-evenly ">
//           <img
//             src={user.profilePictureUrl}
//             alt="Profile"
//             className="w-40 h-40 rounded-full border-2 border-gray-500 object-cover"
//           />

//           <div className="flex flex-col gap-5 items-start">
//             <div className="flex gap-12 mt-2">
//               <h2 className="mt-2 text-xl font-semibold">{user.username}</h2>
//               <div className="flex gap-2">
//                 <button  className="bg-neutral-800 text-white px-3 py-1 rounded-md cursor-pointer">
//                   Edit Profile
//                 </button>
//               </div>
//             </div>

//             <div className="flex gap-6 mt-4 text-sm">
//               <span>
//                 <strong>{Array.isArray(user.uploadedImages) && user.uploadedImages.length}</strong> posts
//               </span>
//               <span>
//                 <strong>{user.followersCount}</strong> followers
//               </span>
//               <span>
//                 <strong>{user.followingCount}</strong> following
//               </span>
//             </div>

//             <div>
//               <p className=" font-medium">
//                 {user.firstName} {user.lastName}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {user.bio || "No bio available"}
//               </p>
//             </div>

//           </div>

//         </div>
        

//         <hr className="border-gray-700 w-[90%] mt-12 my-4" />

//         <div className="flex justify-center gap-8 text-sm">
//           <p className="border-b-2 border-blue-500 pb-2">POSTS</p>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//           {Array.isArray(user.uploadedImages) && user.uploadedImages.length > 0 ? (
//             user.uploadedImages.map((image) => (
//               <div key={image.id} className="w-full aspect-square">
//                 <img
//                   src={image.imageUrl}
//                   alt={image.filename}
//                   className="w-full h-full object-cover rounded-md border"
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-white">No images uploaded yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OtherUserProfile
