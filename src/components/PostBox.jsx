import { useState } from 'react';
import PostModal from './PostModal'; 
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostBox = ({setActiveSection}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const profilePictureUrl = useSelector((state) => state.profile.profileData?.data?.profilePictureUrl);
  const generatedProfilePicture = useSelector((state) => state.profile.generatedProfilePicture);
  const imageUrl = profilePictureUrl || generatedProfilePicture;

  const handleProfileClick = () => {
    // console.log("Profile clicked");
    setActiveSection("profile");
  };

  const handleShareClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="mt-16 md:mt-0 flex items-center gap-3 bg-gradient-to-r from-[#00AEEF] to-[#7B2FF7] px-4 py-2 rounded-full shadow-sm mb-10 ">
        {/* Profile Image with its own click */}
        <div className="w-10 h-10 relative rounded-full overflow-hidden">
          {!imageLoaded && (
            <Skeleton circle width={37} height={37} className="absolute top-0 left-0"  />
          )}
          <img
            src={imageUrl}
            alt="Profile"
            className={`w-10 h-10 rounded-full object-cover cursor-pointer absolute top-0 left-0 transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleProfileClick}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

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

