import { useState } from 'react';
import PostModal from './PostModal'; 
import { useSelector } from "react-redux";

const PostBox = ({setActiveSection}) => {
  const [isOpen, setIsOpen] = useState(false);
  const profilePictureUrl = useSelector((state) => state.profile.profileData?.data?.profilePictureUrl);
  const generatedProfilePicture = useSelector((state) => state.profile.generatedProfilePicture);

  const handleProfileClick = () => {
    console.log("Profile clicked");
    setActiveSection("profile");
  };

  const handleShareClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="mt-16 md:mt-0 flex items-center gap-3 bg-gradient-to-r from-[#00AEEF] to-[#7B2FF7] px-4 py-2 rounded-full shadow-sm mb-10 ">
        {/* Profile Image with its own click */}
        <img
          src={profilePictureUrl || generatedProfilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={handleProfileClick}
        />

        {/* Share text with its own click */}
        <div
          className="text-gray-600 text-center w-full p-2 cursor-pointer bg-white rounded-full"
          onClick={handleShareClick}
        >
          Share photos
        </div>
      </div>

      {/* Modal */}
      {isOpen && <PostModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default PostBox;

