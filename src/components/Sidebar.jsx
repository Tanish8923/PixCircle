import React, { useState } from 'react';
import { FaHome, FaUserFriends, FaSearch, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import horizontal_logo from '../assets/images/ChatGPT Image Jun 9, 2025, 04_57_49 PM.png';
import { useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = [
    { name: "home", icon: <FaHome /> },
    { name: "following", icon: <FaUserFriends /> },
    { name: "search", icon: <FaSearch /> },
    { name: "profile", icon: <FaUser /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setActiveSection("logout");
  };

  return (
    <>
      {/* Top Nav on Mobile */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-500 text-black fixed top-0 w-full z-50">
        <div className="flex items-center justify-between w-full">
          <img src={horizontal_logo} alt="Logo" className="h-14" onClick={() => setActiveSection("home")} />
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-black">
            <FaBars size={30} />
          </button>
        </div>
      </div>

      {/* Sidebar for desktop and mobile drawer */}
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen border-r border-gray-500 fixed p-4 bg-gray-50">
        <img src={horizontal_logo} alt="Logo" className="mb-8 cursor-pointer h-16 mt-2 mx-auto" onClick={() => setActiveSection("home")} />
        <SidebarMenu items={items} activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div className="flex-1  bg-white/10 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

          {/* Sidebar content */}
          <div className="w-64 h-full bg-gray-50 shadow-lg py-4 relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes size={20} />
            </button>
          
            {/* Logo */}
            <div className="mt-2 mb-6">
              <img src={horizontal_logo} alt="Logo" className="h-14" onClick={() => setActiveSection("home")} />
            </div>

            <SidebarMenu items={items} activeSection={activeSection} setActiveSection={(name) => {
              setActiveSection(name);
              setIsMobileMenuOpen(false);
            }} handleLogout={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }} />
          </div>

        </div>
      )}
    </>
  );
};

const SidebarMenu = ({ items, activeSection, setActiveSection, handleLogout }) => (
  <ul className="space-y-4 px-4">
    {items.map((item) => (
      <li key={item.name}>
        <button
          onClick={() => setActiveSection(item.name)}
          className={`flex items-center gap-3 w-full text-left p-2 rounded capitalize cursor-pointer
            ${activeSection === item.name ? "bg-blue-500 text-white" : "text-black hover:bg-gray-100"}`}
        >
          {item.icon}
          {item.name}
        </button>
      </li>
    ))}
    <li>
      <button
        onClick={handleLogout}
        className={`flex items-center gap-3 w-full text-left p-2 rounded capitalize cursor-pointer 
          ${activeSection === "logout" ? "bg-blue-500 text-white" : "text-black hover:bg-gray-100"}`}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </li>
  </ul>
);

export default Sidebar;
