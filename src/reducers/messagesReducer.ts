import { IAction, IDetails, IMessage } from "../interfaces";
import { IMessagesState } from "../contexts/MessagesContextProvider";

export const changeTheConversation =
  "CHANGE THE CURRENT COVERSATION TO SOMETHING ELSE";
export const fetchMessagesForConversation =
  "FETCH MESSAGES FOR THE CURRENT ONGOING CONVERSATION";
export const setCurrentConvoReceiverDetails =
  "SET THE CURRENT CONVERSATION RECEIVER DETAILS";
export const setFilteredMessages = "SET FILTERED MESSAGES";

const messagesReducer = (
  state: IMessagesState,
  action: IAction
): IMessagesState => {
  switch (action.type) {
    case changeTheConversation:
      return {
        ...state,
        conversationID: action.payload?.id as unknown as string,
      };
    case fetchMessagesForConversation:
      return {
        ...state,
        messages: action.payload?.messages as unknown as IMessage[],
      };
    case setCurrentConvoReceiverDetails:
      return {
        ...state,
        currentConvoReceiverDetails: action.payload
          ?.details as unknown as IDetails,
      };
    case setFilteredMessages:
      return {
        ...state,
        filteredMessages: action.payload?.messages as unknown as IMessage[],
      };

    default:
      return state;
  }
};

export default messagesReducer;
