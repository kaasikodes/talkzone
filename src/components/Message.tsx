import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import Avatar from "./Avatar";
import moment from "moment";

import { IMessage } from "../interfaces/index";
const Message: React.FC<IMessage> = ({
  content,
  sent_on,
  senderName,
  receiverName,
  senderId,
  senderImg,
  receiverImg,
}) => {
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const sent = user?.id === senderId;
  return (
    <div
      className={`${
        sent ? "justify-end" : "justify-start"
      } message-container flex mb-5`}
    >
      <div className="flex ">
        <Avatar name={senderName} image={senderImg} />
        <div className="content-container ml-3">
          <h6 className="capitalize text-gray-800 mb-1 font-semibold">
            {/* if user sent the message show you instead of the senderName */}
            {sent ? "You" : senderName}
            <span className="ml-2 text-gray-300 text-sm">
              {moment(new Date(sent_on)).fromNow()}
            </span>
          </h6>
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
