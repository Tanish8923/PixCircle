/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"

import { signUpAndSendOtp , fetchPreferences } from "../../services/operations/authAPI"
import { setSignupData } from "../../slices/authSlice"

const SignUpForm = ({ switchView }) => {

  const dispatch = useDispatch()

  const [preferences, setPreferences] = useState([]);
  const [selectedPrefs, setSelectedPrefs] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, userName, email, password, confirmPassword } = formData

  // const passwordChecks = {
  //   minLength: (pw) => pw.length >= 8,
  //   upperCase: (pw) => /[A-Z]/.test(pw),
  //   lowerCase: (pw) => /[a-z]/.test(pw),
  //   digit: (pw) => /[0-9]/.test(pw),
  //   specialChar: (pw) => /[!@#$%^&*]/.test(pw),
  // };

  // const isPasswordValid = (pw) => {
  //   return (
  //     passwordChecks.minLength(pw) &&
  //     passwordChecks.upperCase(pw) &&
  //     passwordChecks.lowerCase(pw) &&
  //     passwordChecks.digit(pw) &&
  //     passwordChecks.specialChar(pw)
  //   );
  // };


  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    const isValidPassword = (password) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      return regex.test(password);
    };
    
    if (!isValidPassword(password)) {
      toast.error("Password must be 8+ chars, include uppercase, lowercase, number & special character.");
      return;
    }


    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      selectedPrefs
    }
    // console.log("Signup Data:", signupData) 

    // Setting signup data to state 
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(signUpAndSendOtp(signupData, switchView))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setSelectedPrefs([]);
  }

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
    <div>
      <h2 className="text-xl font-semibold mb-4">Create an Account</h2>

      <form onSubmit={handleOnSubmit} className="space-y-2">
        <div className="flex gap-4">
          <input
            required
            value={firstName}
            onChange={handleOnChange}
            type="text"
            placeholder="First Name"
            className="w-1/2 p-2 border rounded"
            name="firstName"
          />
          <input
            required
            value={lastName}
            onChange={handleOnChange}
            type="text"
            placeholder="Last Name"
            className="w-1/2 p-2 border rounded"
            name="lastName"
          />
        </div>

        <input
          required
          value={userName}
          onChange={handleOnChange}
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          name="userName"
        />
        <input
          required
          value={email}
          onChange={handleOnChange}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          name="email"
        />

        <div className="flex gap-4">
          <div className="relative w-1/2">
             
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full p-2 border rounded pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </span>
          </div>
          
          <div className="relative w-1/2">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full p-2 border rounded pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
              )}
            </span>
          </div>
          
        </div>

        {/* {password.length > 0 && !isPasswordValid(password) && (
          <div className="mt-2 text-xs text-gray-700 space-y-1">
            <p className={`${passwordChecks.minLength(password) ? "text-green-600" : "text-red-600"}`}>
              {passwordChecks.minLength(password) ? "✅" : "❌"} At least 8 characters
            </p>
            <p className={`${passwordChecks.upperCase(password) ? "text-green-600" : "text-red-600"}`}>
              {passwordChecks.upperCase(password) ? "✅" : "❌"} 1 uppercase letter
            </p>
            <p className={`${passwordChecks.lowerCase(password) ? "text-green-600" : "text-red-600"}`}>
              {passwordChecks.lowerCase(password) ? "✅" : "❌"} 1 lowercase letter
            </p>
            <p className={`${passwordChecks.digit(password) ? "text-green-600" : "text-red-600"}`}>
              {passwordChecks.digit(password) ? "✅" : "❌"} 1 number
            </p>
            <p className={`${passwordChecks.specialChar(password) ? "text-green-600" : "text-red-600"}`}>
              {passwordChecks.specialChar(password) ? "✅" : "❌"} 1 special character (!@#$%^&*)
            </p>
          </div>
        )} */}
        
        

        {/* Preferences */}
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

        <button className="w-full bg-blue-500 text-white py-2 rounded-4xl mt-4 cursor-pointer">
          Create Account
        </button>
      </form>

      <div className="text-sm mt-2 flex align-center justify-center gap-2">
        <span className="text-gray-500">Already have an account?</span>
        <button
          className="text-blue-500 cursor-pointer"
          onClick={() => switchView('login')}
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
