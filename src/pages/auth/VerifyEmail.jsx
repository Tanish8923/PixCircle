/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { resendSignupOtp , verifyEmail } from "../../services/operations/authAPI";

const OtpForm = ({ switchView }) => {
  const [otp, setOtp] = useState('');
  const { signupData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

    const handleVerifyAndSignup = (e) => {
      e.preventDefault();
      const {
        email,
      } = signupData;
  
      dispatch(
        verifyEmail(
          email,
          otp,
          switchView,
        )
      );
    };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-0.5">Enter OTP</h2>
      <p className="mb-6 text-gray-600">We sent an OTP to your email.</p>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => (
          <input
            {...props}
            className="border border-gray-300 w-24 h-10 mx-1 text-center rounded"
            style={{ width: '40px' }}
          />
        )}
      />

      <div className="text-sm mt-2 flex items-center justify-end">
        <button
          className="flex items-center text-blue-500 gap-x-2 cursor-hover"
          onClick={() => dispatch(resendSignupOtp(signupData.email))}
        >
          <RxCountdownTimer />
          Resend Otp
        </button>
      </div>

      <button
        onClick={handleVerifyAndSignup}
        className="w-full bg-blue-500 text-white py-2 rounded-4xl mt-6 cursor-pointer"
      >
        Verify OTP
      </button>

      <div className="text-sm mt-2 flex items-center justify-start">
        <button
          onClick={() => switchView('signup')}
          className="text-blue-500 cursor-pointer flex items-center gap-x-2"
        >
          <BiArrowBack /> Back to Signup
        </button>
      </div>
    </div>
  );
};

export default OtpForm;
