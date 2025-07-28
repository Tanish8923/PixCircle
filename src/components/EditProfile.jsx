/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchPreferences } from "../services/operations/authAPI";
import { updateProfileDetails } from "../services/operations/profileAPI";

const EditProfile = ({ setActiveSection }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const generatedProfilePicture = useSelector(
    (state) => state.profile.generatedProfilePicture
  );

  const [bio, setBio] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const getPreferences = async () => {
      try {
        const fetchedTags = await dispatch(fetchPreferences());
        setPreferences(fetchedTags);
      } catch (error) {
        toast.error("Could not load preferences");
      }
    };
    getPreferences();
  }, []);

  useEffect(() => {
    if (profile?.data) {
      setBio(profile.data.bio || "");
      setSelectedPrefs(
        profile.data.preferences.map((pref) => pref.preferenceName)
      );
      setPreviewImage(
        profile.data.profilePictureUrl || generatedProfilePicture
      );
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const togglePreference = (tag) => {
    setSelectedPrefs((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profilePayload = {
      username: profile.data.username,
      bio,
      preferences: selectedPrefs.map((pref) => ({ preferenceName: pref })),
    };
    const formData = new FormData();
    formData.append("profile", JSON.stringify(profilePayload));
    if (imageFile) formData.append("profilePicture", imageFile);
    dispatch(updateProfileDetails(setActiveSection, formData));
  };

  if (!profile?.data) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  const { username, firstName, lastName } = profile.data;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-12 max-w-4xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-8 mt-16 md:mt-0">Edit Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={previewImage}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <label className="mt-4 cursor-pointer text-blue-600 font-medium">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Username */}
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            disabled
            className="w-full bg-gray-100 px-4 py-2 rounded border border-gray-300"
          />
        </div>

        {/* First & Last Name */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              disabled
              className="w-full bg-gray-100 px-4 py-2 rounded border border-gray-300"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              disabled
              className="w-full bg-gray-100 px-4 py-2 rounded border border-gray-300"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full px-4 py-2 border rounded border-gray-300 min-h-[100px]"
          />
        </div>

        {/* Preferences */}
        <div>
          <label className="block font-medium mb-3">Preferences</label>
          <div className="flex flex-wrap gap-3">
            {preferences.length === 0 && <p className="text-sm text-gray-500">Loading...</p>}
            {preferences.map((tagObj) => (
              <button
                key={tagObj.id}
                type="button"
                onClick={() => togglePreference(tagObj.name)}
                className={`px-4 py-1.5 rounded-full border text-sm transition 
                  ${
                    selectedPrefs.includes(tagObj.name)
                      ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {tagObj.name}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="sticky bottom-4 text-center">
          <button
            type="submit"
            className="bg-blue-600 w-80 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;