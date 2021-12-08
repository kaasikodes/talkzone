import { useState, useEffect, useContext } from "react";

import useWindowSize from "../hooks/useWindowSize";
import TopHeader from "../components/TopHeader";
import MessagesContainer from "../components/MessagesContainer";
import Overlay from "../components/Overlay";

import { MessagesContext } from "../contexts/MessagesContextProvider";

import SideBar from "../components/SideBar";
import ChatComposerHeading from "../components/ChatComposerHeading";
import ChatComposer from "../components/ChatComposer";
import { IDetails } from "../interfaces";

const Dashboard = () => {
  const { width } = useWindowSize();

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleMobileResponse = () => {
      width < 996 ? setMobileView(true) : setMobileView(false);
    };
    handleMobileResponse();
  }, [width]);

  const MessagesCtx = useContext(MessagesContext);
  const messagesState = MessagesCtx?.state;

  // does this work only for conversationID or when any parameter in state changes
  return (
    <>
      <div className="flex flex-col relative">
        {/* top */}
        <TopHeader />
        {/* main side n chat - start conversation, create group, Manage groups,*/}
        <div
          className="flex flex-1 items-stretch min-h-screen relative"
          style={{ top: "3.5rem" }}
        >
          {/* overlay */}
          <Overlay />
          {/* Side bar */}
          {!mobileView && <SideBar />}

          {/* Chat Composer */}
          <ChatComposer mobileView={mobileView}>
            {/* heading */}
            {!!messagesState?.currentConvoReceiverDetails.name && (
              <ChatComposerHeading
                nameOfReceiver={messagesState.currentConvoReceiverDetails.name}
                showMobileBtn={mobileView}
                mobileView={mobileView}
                receiverId={messagesState.currentConvoReceiverDetails.id}
              />
            )}

            {/* Messages container */}
            <div className="relative">
              <MessagesContainer
                mobileView={mobileView}
                currentConvoReceiverDetails={
                  messagesState?.currentConvoReceiverDetails as unknown as IDetails
                }
                conversationId={
                  messagesState?.conversationID as unknown as string
                }
              />
            </div>
          </ChatComposer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
