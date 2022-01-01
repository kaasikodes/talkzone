// import React, { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import List from "../components/List";
// import ActionItem from "../components/ActionItem";
// import Avatar from "../components/Avatar";
// import { PersonsContext } from "../contexts/PersonsContextProvider";
// import { UserContext } from "../contexts/UserContextProvider";
// import { OverlayContext } from "../contexts/OverlayContextProvider";
// import { MessagesContext } from "../contexts/MessagesContextProvider";
// import { GroupsContext } from "../contexts/GroupsContextProvider";
// import { db } from "../fbconfig";
// import { setDoc, getDoc, doc } from "firebase/firestore";
// import GroupsJoinedBox from "./GroupsJoinedBox";
// import { hashConversationId } from "../utilities/conversationsUtility";
// import {
//   changeTheConversation,
//   setCurrentConvoReceiverDetails,
// } from "../reducers/messagesReducer";
// import { setGroupView, setCurrentGroupInfo } from "../reducers/groupsReducer";
// import { ConversationsContext } from "../contexts/ConversationsContextProvider";

// const ConversationUI = () => {
//   const [showGroups, setShowGroups] = useState(false);
//   const [showPersons, setShowPersons] = useState(true);

//   const PsnsCtx = useContext(PersonsContext);
//   const persons = PsnsCtx?.persons;
//   const GrpsCtx = useContext(GroupsContext);
//   const groupsDispatch = GrpsCtx?.dispatch;
//   const groupsState = GrpsCtx?.state;
//   const UserCtx = useContext(UserContext);
//   const sender = UserCtx?.state;

//   const OvrCtx = useContext(OverlayContext);
//   const handleCompName = OvrCtx?.handleCompName;
//   const MsgCtx = useContext(MessagesContext);
//   const dispatch = MsgCtx?.dispatch;
//   const ConvoCtx = useContext(ConversationsContext);
//   const handleCurrentConvos = ConvoCtx?.handleCurrentConvos;
//   const beginPersonConversation = (receiver: {
//     id: string;
//     name: string;
//     img: string;
//   }) => {
//     // init convo id
//     // check if convo is present
//     // if it is present - simply, remove overlay, and dispatch to messagesContext, the conversation to show
//     // otherswise create convo id with hashed id

//     const uniqID = hashConversationId(
//       sender?.id as unknown as string,
//       receiver.id
//     );

//     const setConvo = async (id: string) => {
//       const docRef = doc(db, "conversations", id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         // clear overlay
//         // dispatch messages acc
//         (dispatch as unknown as Function)({
//           type: setCurrentConvoReceiverDetails,
//           payload: {
//             details: {
//               id: receiver.id,
//               name: receiver.name,
//               img: receiver.img,
//             },
//           },
//         });

//         (dispatch as unknown as Function)({
//           type: changeTheConversation,
//           payload: { id: uniqID },
//         });
//         (handleCompName as unknown as Function)("");
//       } else {
//         await setDoc(docRef, {
//           belongs_to: [receiver.id, sender?.id],
//           name_of_owner: [receiver.name, sender?.name],
//         });
//         // clear overlay
//         // dispatch messages acc
//         (dispatch as unknown as Function)({
//           type: setCurrentConvoReceiverDetails,
//           payload: {
//             details: {
//               id: receiver.id,
//               name: receiver.name,
//               img: receiver.img,
//             },
//           },
//         });

//         (dispatch as unknown as Function)({
//           type: changeTheConversation,
//           payload: { id: uniqID },
//         });
//         (handleCompName as unknown as Function)("");
//       }
//     };

//     setConvo(uniqID);
//     (handleCurrentConvos as unknown as Function)({
//       id: uniqID,
//       name: receiver.name,
//     });
//     (groupsDispatch as unknown as Function)({
//       type: setGroupView,
//       payload: { status: false },
//     });
//   };
//   const beginGroupConversation = (receiver: {
//     id: string;
//     name: string;
//     img: string;
//   }) => {
//     // init convo id
//     //the id is the group id no need for hashing

//     const uniqID = receiver.id;

//     const setConvo = async (id: string) => {
//       const docRef = doc(db, "conversations", id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         // clear overlay
//         // dispatch messages acc
//         (dispatch as unknown as Function)({
//           type: setCurrentConvoReceiverDetails,
//           payload: {
//             details: {
//               id: receiver.id,
//               name: receiver.name,
//               img: receiver.img,
//             },
//           },
//         });

//         (dispatch as unknown as Function)({
//           type: changeTheConversation,
//           payload: { id: uniqID },
//         });
//         (handleCompName as unknown as Function)("");
//       } else {
//         await setDoc(docRef, {
//           belongs_to: [receiver.id, sender?.id],
//           name_of_owner: [receiver.name, sender?.name],
//         });
//         // clear overlay
//         // dispatch messages acc
//         (dispatch as unknown as Function)({
//           type: setCurrentConvoReceiverDetails,
//           payload: {
//             details: {
//               id: receiver.id,
//               name: receiver.name,
//               img: receiver.img,
//             },
//           },
//         });

//         (dispatch as unknown as Function)({
//           type: changeTheConversation,
//           payload: { id: uniqID },
//         });

//         (handleCompName as unknown as Function)("");
//       }
//     };

//     setConvo(uniqID);

//     (handleCurrentConvos as unknown as Function)({
//       id: uniqID,
//       name: receiver.name,
//     });
//     (groupsDispatch as unknown as Function)({
//       type: setGroupView,
//       payload: { status: true },
//     });
//     const info = groupsState?.groupsJoined?.find(
//       (group) => group.id === uniqID
//     );
//     (groupsDispatch as unknown as Function)({
//       type: setCurrentGroupInfo,
//       payload: { info },
//     });
//   };
//   return (
//     <div className="w-full overflow-hidden">
//       <div className="nav flex w-full">
//         <span
//           className={`authNavItem ${showPersons && "active"}`}
//           onClick={() => {
//             setShowGroups(false);
//             setShowPersons(true);
//           }}
//         >
//           Person
//         </span>
//         <span
//           className={`authNavItem ${showGroups && "active"}`}
//           onClick={() => {
//             setShowGroups(true);
//             setShowPersons(false);
//           }}
//         >
//           Group
//         </span>
//       </div>
//       {/* content */}
//       <div className="content w-full px-4 py-2 mt-4 max-h-64 overflow-y-auto">
//         {showGroups && (
//           <GroupsJoinedBox
//             userId={sender?.id as unknown as string}
//             passableFunc={beginGroupConversation}
//           />
//         )}

//         {showPersons && (
//           <motion.div
//             className="w-full"
//             initial={{ x: "200" }}
//             animate={{ x: 0 }}
//             transition={{ type: "tween", ease: "easeOut" }}
//           >
//             <List>
//               {persons?.length !== 0 &&
//                 persons?.map(({ name, id, photo_url }) => (
//                   <div className={`mb-1`} key={id}>
//                     <ActionItem
//                       text={name}
//                       handleClick={() =>
//                         beginPersonConversation({
//                           id,
//                           name,
//                           img: photo_url as unknown as string,
//                         })
//                       }
//                     >
//                       <Avatar
//                         name={name}
//                         image={photo_url?.length === 0 ? null : photo_url}
//                       />
//                     </ActionItem>
//                   </div>
//                 ))}
//             </List>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConversationUI;

import React from "react";

const ConversationUI = () => {
  return <div>vccvc</div>;
};

export default ConversationUI;
