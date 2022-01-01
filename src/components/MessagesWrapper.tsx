import React from "react";
import MessageComposer from "./MessageComposer";
import ConversationsContextProvider from "../contexts/ConversationsContextProvider";
const MessagesWrapper = () => {
  return (
    <div>
      <MessageComposer />
    </div>
  );
};

export default MessagesWrapper;
