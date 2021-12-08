import React, { useContext } from "react";
import { OverlayContext } from "../contexts/OverlayContextProvider";
import { MessagesContext } from "../contexts/MessagesContextProvider";
import Button from "./Button";
import { db } from "../fbconfig";
import {
  doc,
  arrayRemove,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { UserContext } from "../contexts/UserContextProvider";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import {
  changeTheConversation,
  setCurrentConvoReceiverDetails,
} from "../reducers/messagesReducer";
import { setGroupLeftId } from "../reducers/groupsReducer";

const ConfirmLeaveGroup = () => {
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const GroupsCtx = useContext(GroupsContext);
  const GroupsState = GroupsCtx?.state;
  const GroupDispatch = GroupsCtx?.dispatch;
  const group = GroupsState?.currentGroupInfo;
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  const MsgCtx = useContext(MessagesContext);
  const dispatch = MsgCtx?.dispatch;
  const leaveGroup = async () => {
    const docRef = doc(db, "groups", group?.id as string);

    await updateDoc(docRef, {
      members: arrayRemove(user?.id),
    });
    // notify creator of group that someone left
    await addDoc(collection(db, "notifications"), {
      content: `${user?.name} just left ${group?.name}`,
      toWhomItMayConcern: [group?.creatorId],
    });
    (dispatch as unknown as Function)({
      type: setCurrentConvoReceiverDetails,
      payload: {
        details: {},
      },
    });
    (dispatch as unknown as Function)({
      type: changeTheConversation,
      payload: { id: "" },
    });
    (GroupDispatch as unknown as Function)({
      type: setGroupLeftId,
      payload: { id: group?.id },
    });

    (handleCompName as unknown as Function)("");
  };
  return (
    <div className=" flex items-center bg-white px-6 mt-4 rounded-lg w-72">
      <div className="w-full overflow-hidden">
        <h4 className="text-center text-lg font-bold text-blue-400 mt-2 mb-4 capitalize">
          Are you sure you want to leave the group?
        </h4>

        <div className="overflow-auto py-4 w-full flex justify-around items-center">
          <Button
            content="Yes"
            handleClick={() => {
              leaveGroup();
            }}
          />
          <Button
            color="red"
            content="No"
            handleClick={() => {
              (handleCompName as unknown as Function)("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmLeaveGroup;
