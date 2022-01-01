import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import List from "./List";
import { getGroupsNotJoinedFromServer } from "../utilities/groupsUtility";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { OverlayContext } from "../contexts/OverlayContextProvider";
import {
  updateFetchingGroupsNotJoinedStatus,
  fetchGroupsNotJoined,
} from "../reducers/groupsReducer";
import {
  doc,
  arrayUnion,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../fbconfig";
import { IGroup } from "../interfaces";

type groupId = string | number;

const JoinGroupForm = () => {
  const [groupsToJoin, setGroupsToJoin] = useState<groupId[]>([]);
  const GroupsCtx = useContext(GroupsContext);
  const state = GroupsCtx?.state;
  const dispatch = GroupsCtx?.dispatch;
  const fetchingGroupsNotJoinedStatus = state?.fetchingGroupsNotJoinedStatus;
  const groupsNotJoined = state?.groupsNotJoined;
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  const userId = user?.id;

  const handleSubmit = async () => {
    const updateGroup = (id: groupId) => {
      return new Promise(async (resolve) => {
        const docRef = doc(db, "groups", id as string);
        resolve(
          updateDoc(docRef, {
            members: arrayUnion(userId),
          })
        );
      });
    };
    //notify the members of the group that a new member has joined
    const notifyMembersOfGroup = (group: IGroup) => {
      return new Promise(async (resolve) => {
        resolve(
          addDoc(collection(db, "notifications"), {
            content: `${user?.name} just joined ${group.name}`,
            toWhomItMayConcern: group.members,
            time: new Date().toString(),
          })
        );
      });
    };

    await Promise.all(groupsToJoin.map((id) => updateGroup(id)));

    (handleCompName as unknown as Function)("");
    await Promise.all(
      (groupsNotJoined as unknown as IGroup[])
        .filter((group: IGroup) => groupsToJoin.includes(group.id))
        .map((group: IGroup) => notifyMembersOfGroup(group))
    );
    // add the id of this member to the selected groups, consider using a cloud func for this
  };

  const handleSelect = (id: groupId) => {
    if (groupsToJoin.indexOf(id) === -1) {
      setGroupsToJoin(groupsToJoin.concat(id));
    } else {
      setGroupsToJoin(groupsToJoin.filter((grpId) => id !== grpId));
    }
  };

  useEffect(() => {
    // set status to true
    // fetch if success -  set status to false n dismiss overlay
    (dispatch as unknown as Function)({
      type: updateFetchingGroupsNotJoinedStatus,
      payload: { status: true },
    });
    getGroupsNotJoinedFromServer(userId as unknown as string)
      .then((data) => {
        (dispatch as unknown as Function)({
          type: fetchGroupsNotJoined,
          payload: { groupsNotJoined: data },
        });
        (dispatch as unknown as Function)({
          type: updateFetchingGroupsNotJoinedStatus,
          payload: { status: false },
        });
        // handleCompName("");
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [dispatch, userId]);

  return (
    <div className=" flex items-center bg-white px-6 mt-4 rounded-lg w-72">
      <div className="w-full overflow-hidden">
        <h4 className="text-center text-lg font-bold text-blue-400 mt-2 mb-4">
          Choose Group to join
        </h4>
        <form>
          <div className="overflow-auto h-64 w-full">
            {!fetchingGroupsNotJoinedStatus ? (
              <List>
                {groupsNotJoined?.length !== 0 ? (
                  groupsNotJoined?.map(
                    (group: { id: groupId; name: string }) => (
                      <div
                        className={`flex items-baseline mb-1`}
                        key={group.id}
                      >
                        {group.name}
                        <input
                          type="checkbox"
                          className="ml-2"
                          checked={groupsToJoin.indexOf(group.id) !== -1}
                          onChange={() => handleSelect(group.id)}
                        />
                      </div>
                    )
                  )
                ) : (
                  <p>No groups to join</p>
                )}
              </List>
            ) : (
              <p> Loading</p>
            )}
          </div>
          {/* Button Container */}
          <div className="py-4 mt-2">
            <Button content="Join" handleClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGroupForm;
