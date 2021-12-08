import React, { useState, createContext, useEffect, useContext } from "react";
import { GroupsContext } from "./GroupsContextProvider";

import { IConversation } from "../interfaces";

interface ConvoCtx {
  conversations: IConversation[];
  handleCurrentConvos: Function;
}

export const ConversationsContext = createContext<ConvoCtx | null>(null);

const ConversationsContextProvider: React.FC = (props) => {
  const GroupsCtx = useContext(GroupsContext);
  const GroupState = GroupsCtx?.state;
  const groupLeftId = GroupState?.groupLeftId;
  // the difference between when user was last on thread and when not is watched via a snapshot
  //  5 max to prevent to many reads, this should be in order of conversations recently clicked,
  // hence the user should keepa record of the 5 most recent convos
  const [conversations, setConversations] = useState<IConversation[] | []>([]);
  useEffect(() => {
    //console.log("ready to BE A BOSS");
    setConversations((conversations) =>
      conversations.filter((convo) => convo.id !== groupLeftId)
    );
  }, [groupLeftId]);

  // the conversations are added as per the last three the user clicked - stored in recent conversations
  // onSnapshot of the convos via where clause
  // the difference is monitored
  // the last time the messages for convo where on display keep count
  // when the messages are not on delay then calc the difference

  const handleCurrentConvos = (currentConvo: IConversation) => {
    setConversations((conversations) =>
      !!conversations.find((convo) => convo?.id === currentConvo.id) === false
        ? [currentConvo, ...conversations]
        : [
            currentConvo,
            ...conversations.filter((convo) => convo?.id !== currentConvo.id),
          ]
    );
    if (conversations.length >= 5) {
      setConversations((conversations) => conversations.slice(0, 5));
    }
  };
  return (
    <ConversationsContext.Provider
      value={{ conversations, handleCurrentConvos }}
    >
      {props.children}
    </ConversationsContext.Provider>
  );
};

export default ConversationsContextProvider;
