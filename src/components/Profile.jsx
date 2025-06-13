import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFollowers, getFollowing } from "../services/operations/followAPI"; // adjust path as needed

const Profile = ({setActiveSection}) => {
  const profile = useSelector((state) => state.profile.profileData);
  const generatedProfilePicture = useSelector((state) => state.profile.generatedProfilePicture);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // console.log("Profile Data generatedProfilePicture:", generatedProfilePicture);
  // const profileImageFromStorage = localStorage.getItem("profileImage");

  useEffect(() => {
    // const profileImageFromStorage = localStorage.getItem("profileImage");
    // console.log("Profile Image from localStorage:", profileImageFromStorage);

    if (profile?.data?.username) {
      const fetchFollowData = async () => {
        try {
          const followersData = await getFollowers(profile.data.username);
          const followingData = await getFollowing(profile.data.username);

          setFollowersCount(followersData.length || 0);
          setFollowingCount(followingData.length || 0);
        } catch (error) {
          console.error("Error fetching followers/following:", error);
        }
      };

      fetchFollowData();
    }
  }, [profile]);

  if (!profile || !profile.data) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const handleEditProfile = () => {
    setActiveSection("editProfile"); // or setActiveForm(true) depending on your setup
  };

  

  const {
    username,
    firstName,
    lastName,
    profilePictureUrl,
    images,
    bio
  } = profile.data;
  // console.log("Profile Data:", profile.data);
  // console.log("received images:", images);

  return (
    <div className="min-h-screen mt-16 md:mt-0  text-black p-4 sm:p-6">
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 w-full md:items-start items-center justify-evenly ">
          <img
            src={profilePictureUrl || generatedProfilePicture }
            alt="Profile"
            className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-2 border-gray-500 object-cover"
          />

          <div className="flex flex-col gap-5 items-start">
            <div className="flex gap-12 mt-2">
              <h2 className="text-xl font-semibold">{username}</h2>
              <div className="flex gap-2">
                <button onClick={handleEditProfile} className="bg-neutral-800 text-white px-3 py-1 rounded-md cursor-pointer">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="flex gap-6 mt-4 text-sm">
              <span>
                <strong>{Array.isArray(images) &&images.length}</strong> posts
              </span>
              <span>
                <strong>{followersCount}</strong> followers
              </span>
              <span>
                <strong>{followingCount}</strong> following
              </span>
            </div>

            <div>
              <p className=" font-medium">
                {firstName} {lastName}
              </p>
              <p className="text-sm text-gray-500 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg break-words whitespace-pre-line">
                {bio || "No bio available"}
              </p>

            </div>

          </div>

        </div>
        

        <hr className="border-gray-700 w-[90%] mt-12 my-4" />

        <div className="flex justify-center gap-8 text-sm">
          <p className="border-b-2 border-blue-500 pb-2">POSTS</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {Array.isArray(images) && images.length > 0 ? (
            images.map((image) => (
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

export default Profile;
