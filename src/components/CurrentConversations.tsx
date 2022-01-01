// import { useContext } from "react";
// import { ConversationsContext } from "../contexts/ConversationsContextProvider";
// import { MessagesContext } from "../contexts/MessagesContextProvider";
// import {
//   changeTheConversation,
//   setCurrentConvoReceiverDetails,
// } from "../reducers/messagesReducer";

// import ActionItem from "../components/ActionItem";
// // import { RiArrowDropDownLine } from "react-icons/ri";

// interface IConversation {
//   id: number | string;
//   name: string;
//   noOfUnreadMessages?: number;
// }

// const CurrentConversations = () => {
//   const ConvoCtx = useContext(ConversationsContext);
//   const conversations = ConvoCtx?.conversations as unknown as IConversation[];
//   const MsgCtx = useContext(MessagesContext);
//   const dispatch = MsgCtx?.dispatch;

//   return (
//     <div>
//       <h4 className="pl-4 text-lg font-bold border-solid border-b border-t border-blue-100 py-3">
//         Conversations
//       </h4>
//       <div className="action-items-container px-4 flex flex-col pb-4 pt-1 ">
//         {conversations?.length > 0 &&
//           conversations?.map(({ id, name }) => (
//             <div key={id} className="relative flex">
//               <ActionItem
//                 text={name as unknown as string}
//                 handleClick={() => {
//                   (dispatch as unknown as Function)({
//                     type: setCurrentConvoReceiverDetails,
//                     payload: {
//                       details: {
//                         id,
//                         name,
//                         img: "",
//                       },
//                     },
//                   });
//                   (dispatch as unknown as Function)({
//                     type: changeTheConversation,
//                     payload: { id },
//                   });
//                 }}
//               >
//                 #
//               </ActionItem>
//               {/* ltr when we want to show no ogf unread messages */}
//               {/* <div
//                 className="bg-blue-400 text-sm text-white font-semibold p-1 h-4  rounded absolute flex justify-center items-center relative"
//                 style={{ zIndex: 2, left: "-10px" }}
//               >
//                 7
//               </div> */}
//             </div>
//           ))}
//         {/* <ActionItem text="more" handleClick={() => alert("i work")}>
//           <RiArrowDropDownLine />
//         </ActionItem> */}
//       </div>
//     </div>
//   );
// };

// export default CurrentConversations;

import React, { useEffect, useState } from "react";
import { IConversation } from "../interfaces";
import { listenToCurrentConversations } from "../utilities/userUtility";
import { Link } from "react-router-dom";

const CurrentConversations = ({
  userId,
  handleClick,
}: {
  userId: string;
  handleClick: Function;
}) => {
  const [conversations, setConversations] = useState<IConversation[] | []>([]);
  useEffect(() => {
    const unsub = listenToCurrentConversations(userId, setConversations);
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="convos_section pl-6 md:pl-16  pb-2 mt-8">
      <h4 className="text-lg mb-2 font-semibold">Current Conversations</h4>
      {conversations.length > 0 &&
        conversations.map((convo) => (
          <Link
            to={`conversations/${convo.id}`}
            className="flex items-center mb-2"
            onClick={() => handleClick()}
          >
            <span>#</span>
            <span className="ml-2">{convo.name}</span>
          </Link>
        ))}
    </div>
  );
};

export default CurrentConversations;
