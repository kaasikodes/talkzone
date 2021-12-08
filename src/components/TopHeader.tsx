import { useContext, useState, useEffect } from "react";
import { GoQuestion } from "react-icons/go";
// import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

import Avatar from "../components/Avatar";
import { UserContext, removeUser } from "../contexts/UserContextProvider";
import { MessagesContext } from "../contexts/MessagesContextProvider";
import { setFilteredMessages } from "../reducers/messagesReducer";
import { IMessage } from "../interfaces";
import { OverlayContext } from "../contexts/OverlayContextProvider";
import Button from "./Button";
import { getAuth, signOut } from "firebase/auth";

const TopHeader = () => {
  const OverlayCtx = useContext(OverlayContext);
  const handleCompName = OverlayCtx?.handleCompName;
  const UserCtx = useContext(UserContext);
  const currentUser = UserCtx?.state;
  const userDispatch = UserCtx?.dispatch;
  const MessageCtx = useContext(MessagesContext);
  const MessagesState = MessageCtx?.state;
  const dispatch = MessageCtx?.dispatch;
  const messages = MessagesState?.messages;
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      (userDispatch as unknown as Function)({ type: removeUser });
    });
  };

  useEffect(() => {
    // create now based on search on timestamp and a context menu
    const results = messages?.filter(
      (message) =>
        message.content.indexOf(searchTerm) !== -1 ||
        message.senderName.indexOf(searchTerm) !== -1
    );
    (dispatch as unknown as Function)({
      type: setFilteredMessages,
      payload: { messages: results },
    });
  }, [searchTerm, dispatch, messages]);
  const customBlue = "#008DD1";
  return (
    <div
      className="bg-yellow-400 h-14 w-full flex justify-center items-center shadow-md z-50 mb-0.5 px-4 fixed
    "
    >
      <div className="w-full flex justify-between items-center">
        {/* image */}
        <div
          onClick={() => setShowLogout(!showLogout)}
          style={{ position: "relative" }}
        >
          <Avatar name={currentUser?.name} image={currentUser?.photo_url} />
          {showLogout && (
            <div className="bg-white fixed p-4" style={{ top: "52px" }}>
              <Button content="Log out" handleClick={handleLogout} />
            </div>
          )}
        </div>

        {/* search */}
        <div className="flex justify-center items-center">
          <FiClock style={{ fontSize: "1.3rem", color: `${customBlue}` }} />
          <input
            placeholder="Search messages"
            className="px-3 py-0.5 w-56 ml-3 bg-transparent rounded-2xl border-solid border-2  border-blue-600 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* question */}
        <GoQuestion
          style={{ fontSize: "1.3rem", color: `${customBlue}` }}
          onClick={() =>
            (handleCompName as unknown as Function)("shoutout creator")
          }
        />
      </div>
    </div>
  );
};

export default TopHeader;
