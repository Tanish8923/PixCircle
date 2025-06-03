import React from 'react';
import { FaHome, FaUserFriends, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import horizontal_logo from '../assets/images/horizontal_logo.png';
import { useDispatch } from "react-redux"
import { logout } from "../services/operations/authAPI"


const Sidebar = ({ activeSection, setActiveSection }) => {

  const dispatch = useDispatch();
  const items = [
    { name: "home", icon: <FaHome /> },
    { name: "following", icon: <FaUserFriends /> },
    { name: "search", icon: <FaSearch /> },
    { name: "profile", icon: <FaUser /> },
  ];

  const handleLogout = () => {
    dispatch(logout())
    setActiveSection("logout");
  };

  return (
    <div className="w-64 h-screen  border-r-2 border-gray-500  fixed p-4 ">
      {/* PixCircle Logo */}
      <div className="mb-6 cursor-pointer" onClick={() => setActiveSection("home")}>
        <img src={horizontal_logo} alt="PixCircle Logo" className="h-30 w-50 object-center" />
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => setActiveSection(item.name)}
              className={`flex items-center gap-3 w-full text-left p-2 rounded capitalize
                ${activeSection === item.name ? "bg-blue-500 text-white" : "text-black hover:bg-gray-100"}`}
            >
              {item.icon}
              {item.name}
            </button>
          </li>
        ))}
        {/* Logout */}
        <li>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full text-left p-2 rounded capitalize 
              ${activeSection === "logout" ? "bg-blue-500 text-white" : "text-black hover:bg-gray-100"}`}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

