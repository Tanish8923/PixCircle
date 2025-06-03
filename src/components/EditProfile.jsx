/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchPreferences } from "../services/operations/authAPI"; 
import { updateProfileDetails } from "../services/operations/profileAPI";

const EditProfile = ({setActiveSection}) => {
  const profile = useSelector((state) => state.profile.profileData);
  const generatedProfilePicture = useSelector(
    (state) => state.profile.generatedProfilePicture
  );

  const [bio, setBio] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getPreferences = async () => {
      try {
        const fetchedTags = await dispatch(fetchPreferences());
        setPreferences(fetchedTags);
      } catch (error) {
        console.error("Error fetching preferences:", error);
        toast.error("Could not load preferences");
      }
    };
  
    getPreferences();
  }, []);

  useEffect(() => {
    if (profile?.data) {
      setBio(profile.data.bio || "");
      const selected = profile.data.preferences.map((pref) => pref.preferenceName);
      setSelectedPrefs(selected);
  
      setPreviewImage(profile.data.profilePictureUrl || generatedProfilePicture);
    }
  }, [profile]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPreferences = selectedPrefs.map((pref) => ({
      preferenceName: pref,
    }));

    const profilePayload = {
    username: profile.data.username,
    bio: bio,
    preferences: formattedPreferences,
  };

    const formData = new FormData();
    formData.append("profile", JSON.stringify(profilePayload));
    if (imageFile) {
      formData.append("profilePicture", imageFile);
    }
    dispatch(updateProfileDetails(setActiveSection, formData)); 
  
  };
    const togglePreference = (tag) => {
      setSelectedPrefs((prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag)
          : [...prev, tag]
      );
    };

  if (!profile?.data) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const { username, firstName, lastName } = profile.data;

  return (
    <div className="min-h-screen p-6 text-black">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-md mx-auto"
      >
        <div className="flex flex-col items-center gap-2">
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            disabled
            className="w-full bg-gray-100 px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            value={firstName}
            disabled
            className="w-full bg-gray-100 px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            value={lastName}
            disabled
            className="w-full bg-gray-100 px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Write something about yourself"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Preferences</label>
          <div className="flex flex-wrap gap-2">
            {preferences.length === 0 && <p>Loading preferences...</p>}
            {preferences.map((tagObj) => (
              <button
                key={tagObj.id}
                type="button"
                onClick={() => togglePreference(tagObj.name)}
                className={`px-3 py-1 rounded border cursor-pointer select-none
                              ${
                                selectedPrefs.includes(tagObj.name)
                                  ? 'bg-blue-500 text-white border-blue-500'
                                  : 'bg-white text-gray-700 border-gray-300'
                              }
                            `}
              >
                {tagObj.name}
              </button>
            ))}   
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-full mt-8 hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
