import React, { useState, useContext, useEffect } from "react";
import { OverlayContext } from "../contexts/OverlayContextProvider";
import { AiOutlineStar } from "react-icons/ai";
import ActionItem from "./ActionItem";
import MobileBtn from "./MobileBtn";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import { getGroupsJoinedFromServer } from "../utilities/groupsUtility";
import {
  updateFetchingGroupsCreatedStatus,
  fetchGroupsCreated,
  setGroupToManageId,
  setCurrentGroupInfo,
} from "../reducers/groupsReducer";
import { UserContext } from "../contexts/UserContextProvider";
import { IGroup } from "../interfaces";

interface IProps {
  showMobileBtn: boolean;
  nameOfReceiver: string;
  receiverId: string;
  mobileView?: boolean;
}

const ChatComposerHeading: React.FC<IProps> = (props) => {
  const { showMobileBtn, nameOfReceiver, receiverId } = props;
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  const GrpsCtx = useContext(GroupsContext);
  const groupsState = GrpsCtx?.state;
  const groupsDispatch = GrpsCtx?.dispatch;
  const groupView = groupsState?.groupView;
  const [showConvoMenu, setShowConvoMenu] = useState(false);

  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const userId = user?.id;
  useEffect(() => {
    (groupsDispatch as unknown as Function)({
      type: updateFetchingGroupsCreatedStatus,
      payload: { status: true },
    });
    getGroupsJoinedFromServer(userId as unknown as string)
      .then((groups) => {
        // dispatch fetching stattus to true
        (groupsDispatch as unknown as Function)({
          type: updateFetchingGroupsCreatedStatus,
          payload: { status: false },
        });
        (groupsDispatch as unknown as Function)({
          type: fetchGroupsCreated,
          payload: { groupsCreated: groups },
        });
      })
      .catch((err: ErrorEvent) => {});
  }, [groupsDispatch, userId]);

  const handleManageGroup = (id: string) => {
    // then pick the group you wish to manage
    (groupsDispatch as unknown as Function)({
      type: setGroupToManageId,
      payload: { id },
    });
    (handleCompName as unknown as Function)("manage group");
    setShowConvoMenu(false);
  };

  const handleGroupInfo = (id: string) => {
    // then pick the group you wish to manage
    const info = groupsState?.groupsJoined.find(
      (group: IGroup) => group.id === id
    );
    (groupsDispatch as unknown as Function)({
      type: setCurrentGroupInfo,
      payload: { info },
    });
    (handleCompName as unknown as Function)("group info");
    setShowConvoMenu(false);
  };
  return (
    <div className="heading h-12 bg-gray-100">
      <div
        className={`${
          props.mobileView ? "w-full" : "w-4/5"
        } heading flex justify-between h-12 border-solid border-b border-gray-200 px-4 items-center fixed bg-gray-100`}
        style={{
          left: `${props.mobileView ? 0 : "20vw"}`,
          right: "0",
          zIndex: 9,
        }}
      >
        {showMobileBtn && <MobileBtn />}

        <ActionItem
          text={`#${nameOfReceiver}`}
          reverse
          color="text-gray-800"
          handleClick={() => alert("i work")}
        >
          <AiOutlineStar />
        </ActionItem>

        {groupView && (
          <div
            className="flex flex-col "
            onClick={() => setShowConvoMenu(!showConvoMenu)}
          >
            <span className="h-1 w-1 bg-blue-800 rounded mb-1"></span>
            <span className="h-1 w-1 bg-blue-800 rounded mb-1"></span>
            <span className="h-1 w-1 bg-blue-800 rounded mb-1"></span>
          </div>
        )}

        {showConvoMenu && (
          <div
            className="convoMenu absolute bg-white px-4 py-2 text-blue-700"
            style={{ top: 50, right: 0, zIndex: 20 }}
          >
            <ActionItem
              text="group info"
              handleClick={() => handleGroupInfo(receiverId)}
            />
            <ActionItem
              text="manage group"
              handleClick={() => handleManageGroup(receiverId)}
            />
            <ActionItem
              text="leave group"
              handleClick={() => {
                (handleCompName as unknown as Function)("leave group");
                setShowConvoMenu(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComposerHeading;
