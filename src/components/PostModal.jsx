/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState , useEffect} from 'react';
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { fetchPreferences } from "../services/operations/authAPI"
import { uploadImage } from "../services/operations/imageAPI";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

const PostModal = ({ onClose }) => {

  const dispatch = useDispatch()
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null); // for showing the image
  const [imageFile, setImageFile] = useState(null);       // for uploading the actual file

  const [tag, setTag] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [selectedPrefs, setSelectedPrefs] = useState([])
  
  const profileData = useSelector((state) => state.profile.profileData);
  const userId = profileData?.data?.id;;

 const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImagePreview(URL.createObjectURL(file)); // for preview
    setImageFile(file);                         // for upload
    setStep(2);
  }
};

  const handleNext = () => {
    if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setImagePreview(null);
    } else if (step === 3) {
      setStep(2);
    }
  };


  const handleShare = () => {
    if (!imageFile || selectedPrefs.length === 0) {
      toast.error("Please select an image and tag");
      return;
    }
    console.log("Selected Preferences:", selectedPrefs);
    console.log("Image File:", imageFile);
    console.log("User ID:", userId);
    dispatch(uploadImage(selectedPrefs, imageFile , userId));
    onClose();
  };


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

  const togglePreference = (tag) => {
    setSelectedPrefs((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex flex-col items-center justify-center">
      {/* Close button in top-right */}
      <button
        className="absolute top-4 right-4 text-gray-800 text-2xl hover:text-red-400 cursor-pointer"
        onClick={onClose}
      >
        <IoMdClose />
      </button>

      {/* Header (step-specific) */}
      <div className={`${step === 3 ? 'w-full max-w-3xl' : 'w-full max-w-80'}  flex items-center justify-between  text-lg font-semibold mb-2 px-4`}>
        {step === 1 && (
          <div className="text-center w-full">Create New Post</div>
        )}

        {step === 2 && (
          <>
            <button onClick={handleBack} className="text-3xl cursor-pointer">{'←'}</button>
            <div></div> {/* Spacer for center alignment */}
            <button
              onClick={handleNext}
              className="text-sm text-blue-400 font-medium cursor-pointer hover:underline"
            >
              Next
            </button>
          </>
        )}

        {step === 3 && (
          <div className="w-full flex items-center justify-between px-4">
            <button onClick={handleBack} className="text-3xl cursor-pointer">{'←'}</button>
            <div className=" text-center text-lg font-semibold ">Create New Post</div>

          </div>
        )}

      </div>

      {/* Modal content box */}
      <div className={`bg-white  mx-auto rounded-lg shadow-lg border-2 overflow-hidden 
                      ${step === 3 ? 'w-full max-w-3xl h-96' : 'w-full max-w-80 h-96'}`}>

        {/* Step 1: Select Photo */}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full">
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Select a Photo
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        )}

        {/* Step 2: Preview */}
        {step === 2 && imagePreview && (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={imagePreview} alt="Preview" className="w-full h-64 md:h-full object-cover rounded cursor-grab" />
          </div>
        )}

        {/* Step 3: Tag & Share */}
        {step === 3 && (
          <div className="flex flex-col md:flex-row h-full w-full overflow-auto">
            {/* Left side: Image preview */}
            <div className="w-full md:w-1/2">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded" />
            </div        >
        
            {/* Right side: Preferences */}
            <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div>
                  <label className="block mb-6 font-medium ">Select Tag</label>
                  <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
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
              </div>
        
              <button
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
                onClick={handleShare}
              >
                Post
              </button>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
};

export default PostModal;

