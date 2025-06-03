import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { getPasswordResetOTP } from "../../services/operations/authAPI"

const ForgotPasswordForm = ({ switchView }) => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetOTP(email, () => switchView('resetPassword', email)));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full mt-2 bg-blue-500 text-white py-2 rounded-4xl cursor-pointer"
        >
          Send Otp
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

      <div className="text-sm mt-2 flex justify-center items-center gap-2">
        <span className="text-gray-500">No account?</span>
        <button
          type="button"
          className="text-blue-500 cursor-pointer"
          onClick={() => switchView('signup')}
        >
          Create One
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

