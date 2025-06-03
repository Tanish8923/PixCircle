import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import logo from '../../assets/images/vertical_logo.png'; // Adjust the path as necessary
import VerifyEmail from './VerifyEmail';
import ChangePasswordForm from './ChangePasswordForm';

const AuthLayout = () => {
  const [view, setView] = useState('login'); 
  const [email, setEmail] = useState('');

  const renderForm = () => {
    switch (view) {
      case 'signup':
        return <SignupForm switchView={setView} />;
      case 'forgot':
      return <ForgotPasswordForm switchView={(v, emailVal) => {
        setEmail(emailVal);
        setView(v);
      }} />;
      case 'resetPassword': // <-- THIS CASE IS NEEDED
        return <ChangePasswordForm switchView={setView} email={email} />;
      // case 'forgot':
      //   return <ForgotPasswordForm switchView={setView} />;
      case 'verifyEmail':
      return <VerifyEmail switchView={setView} />;  
      case 'login':
      default:
        return <LoginForm switchView={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#00AEEF] to-[#7B2FF7] px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden h-full md:h-[90vh]">
        
        {/* Left Side - Logo */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img src={logo} alt="Logo" className="w-2/3 h-auto" />
        </div>
    
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          {renderForm()}
        </div>
    
      </div>
    </div>
  );
};

export default AuthLayout;
