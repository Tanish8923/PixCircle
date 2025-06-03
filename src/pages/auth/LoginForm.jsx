import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { login } from "../../services/operations/authAPI"

const LoginForm = ({ switchView }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Welcome to PixCircle</h2>
      <form className="space-y-2" onSubmit={handleOnSubmit}>
        {/* Email Input */}
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleOnChange}
          className="w-full p-2 border rounded"
        />

        {/* Password Input with Eye Icon */}
        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
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

        {/* Forgot Password aligned right */}
        <div onClick={() => switchView('forgot')} className="text-right mb-6 text-xs text-blue-500 cursor-pointer">
            Forgot Password?
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-4xl cursor-pointer"
        >
          Login
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-sm mt-2 text-center gap-2 flex justify-center items-center">
        <span className="text-gray-500">No account?</span>
        <button
          className="text-blue-500 cursor-pointer"
          onClick={() => switchView('signup')}
        >
          Create One
        </button>
      </div>
    </div>
  );
};

export default LoginForm;