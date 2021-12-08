import React, { createContext, useReducer } from "react";
import { IMessage, IDetails } from "../interfaces";

import messagesReducer from "../reducers/messagesReducer";

export interface IMessagesState {
  messages: IMessage[];
  filteredMessages: IMessage[];
  conversationID: string;
  currentConvoReceiverDetails: IDetails;
}

interface MessagesContextInterface {
  state: IMessagesState;
  dispatch: Function;
}

export const MessagesContext = createContext<MessagesContextInterface | null>(
  null
);

const initialState: IMessagesState = {
  messages: [],
  filteredMessages: [],
  conversationID: "",
  currentConvoReceiverDetails: { id: "", name: "" },
};

const MessagesContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  return (
    <MessagesContext.Provider
      // value={{
      //   setConversationID,
      //   conversationID,
      //   setCurrentConvoReceiverDetails,
      //   currentConvoReceiverDetails,
      //   messages,
      // }}
      value={{ state, dispatch }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
