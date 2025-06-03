import { useState } from 'react';
import { resendResetOtp , verifyResetOtpAndChangePassword } from "../../services/operations/authAPI"
import { useDispatch } from "react-redux"
import { RxCountdownTimer } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import OtpInput from 'react-otp-input';

const ChangePasswordForm = ({ email, switchView }) => {

  const dispatch = useDispatch()
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyResetOtpAndChangePassword(email, otp, newPassword, switchView));
    setOtp('');
    setNewPassword('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-0.5">Reset Password</h2>
      <p className="mb-6 text-gray-600">We sent an OTP to your email.</p>
      <form onSubmit={handleSubmit}>
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
        <div className="text-sm mt-2 mb-4 flex justify-end items-center gap-2">
          <button
            className="flex items-center text-blue-500 gap-x-2 cursor-pointer"
            onClick={() => dispatch(resendResetOtp(email))}
          >
            <RxCountdownTimer />
            Resend Otp
          </button>
        </div>
        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white mt-6 py-2 rounded-4xl cursor-pointer"
        >
          Change Password
        </button>
      </form>

      <div className="text-sm mt-2 flex justify-center items-center gap-2">
        <span className="text-gray-500">Back to</span>
        <button
          type="button"
          className="text-blue-500 cursor-pointer"
          onClick={() => switchView('login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
