import { FaAccusoft, FaHamburger } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import { RiChatNewFill, RiNotification4Fill } from "react-icons/ri";
import { AiOutlineUsergroupAdd, AiFillIdcard } from "react-icons/ai";
import Avatar from "../components/Avatar";

import logo from "../images/talkzone_logo.svg";

import { useState } from "react";
import { useUser } from "../contexts/UserContextProvider";
import useWindowSize from "../hooks/useWindowSize";
import {
  listenToCurrentConversations,
  logOutUser,
} from "../utilities/userUtility";
import CurrentConversations from "../components/CurrentConversations";

const Dashboard = () => {
  const { width: deviceWidth } = useWindowSize();
  const mobileView = deviceWidth >= 768 ? false : true;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useUser();

  const closeMobileMenu = () => {
    setShowMobileMenu(() => false);
  };

  const handleLogout = () => {
    logOutUser();
    closeMobileMenu();
  };
  return (
    <div className="dashboard w-full h-screen bg-yellow-500">
      {/* header */}
      <div
        className="header bg-yellow-500 h-12 w-screen shadow-md fixed"
        style={{ zIndex: 2 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <Link
            to="/"
            className="logo uppercase flex flex-col mr-6"
            style={{ width: "45px" }}
          >
            <img
              src={logo}
              alt="talkzone logo"
              style={{ objectFit: "contain" }}
            />
          </Link>

          {mobileView ? (
            <FaHamburger
              className="text-white text-lg"
              onClick={() => setShowMobileMenu((val) => !val)}
            />
          ) : (
            <FaAccusoft className="text-white text-lg opacity-0" />
          )}
        </div>
      </div>
      {/*   main sideNav n content */}
      <main
        className="bg-yellow-500 relative flex items-stretch"
        style={{ zIndex: 1, top: "3rem", left: "0", overflowX: "hidden" }}
      >
        {(!mobileView || showMobileMenu) && (
          <div
            className="sidebar w-96 bg-yellow-500 fixed  md:w-1/4 h-full  pt-6 text-white"
            style={{ zIndex: 4 }}
          >
            {/* user */}

            <div className="user_section pl-6 md:pl-16 border-0 border-b border-white pb-2">
              <div className="user_entity flex items-center mb-4">
                <Avatar name={user?.name} />
                <h2 className="ml-4 text-xl font-semibold"> {user?.name}</h2>
              </div>
              <div className="user_options flex flex-col">
                <Link
                  to="view/user/"
                  className="mb-2"
                  onClick={closeMobileMenu}
                >
                  View profile
                </Link>
                <Link
                  to="edit/user/"
                  className="mb-2"
                  onClick={closeMobileMenu}
                >
                  Edit profile
                </Link>
                <p className="mb-2 cursor-pointer" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            </div>

            {/* acions */}
            <div className="actions_section pl-6 md:pl-16 border-0  border-white pb-2 mt-8">
              <Link
                to="start_conversation"
                className="flex items-center mb-2"
                onClick={closeMobileMenu}
              >
                <RiChatNewFill />
                <span className="ml-2">Start Conversation</span>
              </Link>
              <Link
                to="create_group"
                className="flex items-center mb-2"
                onClick={closeMobileMenu}
              >
                <AiFillIdcard />
                <span className="ml-2">Create Group</span>
              </Link>
              <Link
                to="join_group"
                className="flex items-center mb-2"
                onClick={closeMobileMenu}
              >
                <AiOutlineUsergroupAdd />
                <span className="ml-2">Join Group</span>
              </Link>
              <Link
                to="leave_group"
                className="flex items-center mb-2"
                onClick={closeMobileMenu}
              >
                <AiOutlineUsergroupAdd />
                <span className="ml-2">Leave Group</span>
              </Link>
              <Link
                to="manage_group"
                className="flex items-center mb-2"
                onClick={closeMobileMenu}
              >
                <AiOutlineUsergroupAdd />
                <span className="ml-2">Manage Group</span>
              </Link>
              <Link
                to="notifications"
                className="flex items-center mb-2"
                onClick={closeMobileMenu}
              >
                <RiNotification4Fill />
                <span className="ml-2">Notifications</span>
              </Link>
            </div>
            {/* convos - need to fix this component */}
            {/* {user && (
              <CurrentConversations
                handleClick={closeMobileMenu}
                userId={user.id}
              />
            )} */}
          </div>
        )}
        <div className="content w-full md:w-3/4 h-full bg-gray-100 min-h-screen relative md:left-1/4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
