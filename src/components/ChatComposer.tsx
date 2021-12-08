import React from "react";

interface IProps {
  mobileView: boolean;
}

const ChatComposer: React.FC<IProps> = (props) => {
  return (
    <div
      className={`chat-composer bg-gray-100 relative ${
        props.mobileView ? "w-full" : "w-4/5"
      }`}
    >
      {props.children}
    </div>
  );
};

export default ChatComposer;
