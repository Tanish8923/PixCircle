import { useState } from 'react';
import PostModal from './PostModal'; 
import { useSelector } from "react-redux";

const PostBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const profileImageFromStorage = localStorage.getItem("profileImage");
  const profilePictureUrl = useSelector((state) => state.profile.profileData?.data?.profilePictureUrl);
  const generatedProfilePicture = useSelector((state) => state.profile.generatedProfilePicture);

  return (
    <>
      <div
        className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full shadow-sm cursor-pointer mb-4 hover:bg-gray-200 transition"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={profilePictureUrl || generatedProfilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-gray-600 mx-auto">Share photos</div>
      </div>

      {/* Modal */}
      {isOpen && <PostModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default PostBox;

