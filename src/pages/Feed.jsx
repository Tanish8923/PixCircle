/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getProfileDetails } from "../services/operations/profileAPI";

import Sidebar from '../components/Sidebar';
import PostBox from '../components/PostBox';
import RightSidebar from '../components/RightSidebar ';
import HomeFeed from '../components/HomeFeed';
import FollowingFeed from '../components/FollowingFeed';
import Search from '../components/Search';
import Profile from '../components/Profile';
import { getAllUsers } from "../services/operations/searchAPI";
import EditProfile from "../components/EditProfile";
import OtherUserProfile from "../components/OtherUserProfile";
import RightSidebarSkeleton from '../components/skeletons/RightSidebarSkeleton';

const Feed = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await dispatch(getProfileDetails(navigate));
        const users = await dispatch(getAllUsers());
        setUserData(users);
      } catch (error) {
        console.error("Error loading feed data:", error);
      } finally {
        setLoading(false); // ✅ End loading after both APIs
      }
    };

    fetchInitialData();
  }, []);


  return (
    <div className="flex bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="md:ml-64 flex w-full justify-between bg-gray-50 min-h-screen">
        <div className="flex-1 p-6 ">
          {/* <PostBox /> */}
          {["home", "following"].includes(activeSection) && <PostBox setActiveSection={setActiveSection}/>}

          {activeSection === "home" && <HomeFeed/>}
          {activeSection === "following" && <FollowingFeed />}
          {activeSection === "search" && <Search setActiveSection={setActiveSection} setSelectedUser={setSelectedUser}/>}
          {activeSection === "profile" && <Profile setActiveSection={setActiveSection}/>}
          {activeSection === "editProfile" && <EditProfile setActiveSection={setActiveSection}/>}
          {activeSection === "datailedUserProfile" && <OtherUserProfile user={selectedUser}/>}
        </div>

        {["home", "following", "search"].includes(activeSection) && (
          loading ? (
            <RightSidebarSkeleton />
          ) : (
            <RightSidebar
              users={userData}
              setActiveSection={setActiveSection}
              setSelectedUser={setSelectedUser}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Feed;

