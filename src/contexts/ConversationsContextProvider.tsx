import React, { createContext, useReducer, useContext } from "react";

import { IConvo, IAction } from "../interfaces";

export const setCurrentConversation = "SET THE CURRENT CONVERSATION";

interface ConvoCtx {
  state: IConvo;
  dispatch: Function;
}

const initialState: IConvo = {
  id: "",
  receiverId: "",
  receiverName: "",
  receiverImg: "",
};

const convoReducer = (state: IConvo, action: IAction): IConvo => {
  switch (action.type) {
    case setCurrentConversation:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const ConversationsContext = createContext<ConvoCtx | null>(null);

const ConversationsContextProvider: React.FC = (props) => {
  // const handleCurrentConvos = (currentConvo: IConversation) => {
  //   setConversations((conversations) =>
  //     !!conversations.find((convo) => convo?.id === currentConvo.id) === false
  //       ? [currentConvo, ...conversations]
  //       : [
  //           currentConvo,
  //           ...conversations.filter((convo) => convo?.id !== currentConvo.id),
  //         ]
  //   );
  //   if (conversations.length >= 5) {
  //     setConversations((conversations) => conversations.slice(0, 5));
  //   }
  // };
  const [state, dispatch] = useReducer(convoReducer, initialState);
  return (
    <ConversationsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ConversationsContext.Provider>
  );
};

export default ConversationsContextProvider;

export const useCurrentConversation = () => {
  const ConvoCtx = useContext(ConversationsContext);
  const conversation = ConvoCtx?.state;
  const dispatch = ConvoCtx?.dispatch;

  return {
    conversation,
    dispatch,
  };
};
