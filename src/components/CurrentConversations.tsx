import { useContext } from "react";
import { ConversationsContext } from "../contexts/ConversationsContextProvider";
import { MessagesContext } from "../contexts/MessagesContextProvider";
import {
  changeTheConversation,
  setCurrentConvoReceiverDetails,
} from "../reducers/messagesReducer";

import ActionItem from "../components/ActionItem";
// import { RiArrowDropDownLine } from "react-icons/ri";

interface IConversation {
  id: number | string;
  name: string;
  noOfUnreadMessages?: number;
}

const CurrentConversations = () => {
  const ConvoCtx = useContext(ConversationsContext);
  const conversations = ConvoCtx?.conversations as unknown as IConversation[];
  const MsgCtx = useContext(MessagesContext);
  const dispatch = MsgCtx?.dispatch;

  return (
    <div>
      <h4 className="pl-4 text-lg font-bold border-solid border-b border-t border-blue-100 py-3">
        Conversations
      </h4>
      <div className="action-items-container px-4 flex flex-col pb-4 pt-1 ">
        {conversations?.length > 0 &&
          conversations?.map(({ id, name }) => (
            <div key={id} className="relative flex">
              <ActionItem
                text={name as unknown as string}
                handleClick={() => {
                  (dispatch as unknown as Function)({
                    type: setCurrentConvoReceiverDetails,
                    payload: {
                      details: {
                        id,
                        name,
                        img: "",
                      },
                    },
                  });
                  (dispatch as unknown as Function)({
                    type: changeTheConversation,
                    payload: { id },
                  });
                }}
              >
                #
              </ActionItem>
              {/* ltr when we want to show no ogf unread messages */}
              {/* <div
                className="bg-blue-400 text-sm text-white font-semibold p-1 h-4  rounded absolute flex justify-center items-center relative"
                style={{ zIndex: 2, left: "-10px" }}
              >
                7
              </div> */}
            </div>
          ))}
        {/* <ActionItem text="more" handleClick={() => alert("i work")}>
          <RiArrowDropDownLine />
        </ActionItem> */}
      </div>
    </div>
  );
};

export default CurrentConversations;
