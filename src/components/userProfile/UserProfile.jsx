import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  selectUserProfile,
  selectUserStatus,
  logout,
} from "../../redux/feature/user/userSlice.js";
import { removeAccessToken } from "../../lib/secureLocalStorage.js";
import placeHolder from "../../assets/placeholder.jpeg";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectUserProfile);
  const status = useSelector(selectUserStatus);
  const [showDropdown, setShowDropdown] = useState(false);
  const { username, email, profile_image } = profile;

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(logout());
    removeAccessToken();
    onLogout();
  };

  const handleNavigateToUserDetail = (profile) => {
    navigate("/user-detail", { state: profile });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full md:mr-4 cursor-pointer mx-auto">
        <img
          src={placeHolder}
          alt="profile img"
          className="w-full h-full object-cover rounded-full border border-gray-300"
        />
      </div>
    );
  }

  return (
    <>
      <div className="w-auto h-auto rounded-full relative">
        <div
          className="w-8 h-8 rounded-full mr-2 md:mr-4 cursor-pointer mx-auto"
          onClick={handleProfileClick}
        >
          <img
            src={profile_image || placeHolder}
            alt="profile img"
            className="w-full h-full object-cover rounded-full border border-gray-300"
          />
        </div>
        {showDropdown && (
          <div className="absolute top-7 -left-12 w-auto transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 cursor-pointer">
            <div
              onClick={() => handleNavigateToUserDetail(profile)}
              className="flex flex-row justify-center items-center p-3 hover:bg-gray-100"
            >
              <div className="w-10 h-10 rounded-full cursor-pointer mx-auto mr-3">
                <img
                  src={profile_image || placeHolder}
                  alt="profile img"
                  className="w-full h-full object-cover rounded-full border border-gray-300"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{username}</h2>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
            <hr />
            <button
              onClick={handleLogout}
              className="w-full hover:bg-gray-100 text-lg font-semibold text-gray-700 px-4 py-2 rounded-lg flex justify-center items-center"
            >
              ចាកចេញ <IoIosLogOut className="ml-2 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
