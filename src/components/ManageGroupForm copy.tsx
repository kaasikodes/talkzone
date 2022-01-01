import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { getGroupsCreatedFromServer } from "../utilities/groupsUtility";
import {
  updateFetchingGroupsCreatedStatus,
  fetchGroupsCreated,
  setGroupToManageId,
} from "../reducers/groupsReducer";
import { IGroup } from "../interfaces";
import { OverlayContext } from "../contexts/OverlayContextProvider";
const ManageGroupForm = () => {
  const [choosen, setChoosen] = useState("");
  const GroupsCtx = useContext(GroupsContext);
  const state = GroupsCtx?.state;
  const dispatch = GroupsCtx?.dispatch;

  const groupsCreated = state?.groupsCreated;
  const fetchingGroupsCreatedStatus = state?.fetchingGroupsCreatedStatus;
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  const userId = user?.id;
  const handleSubmit = (id: string) => {
    (dispatch as unknown as Function)({
      type: setGroupToManageId,
      payload: { id },
    });
    (handleCompName as unknown as Function)("manage group");
  };
  useEffect(() => {
    (dispatch as unknown as Function)({
      type: updateFetchingGroupsCreatedStatus,
      payload: { status: true },
    });
    getGroupsCreatedFromServer(userId as unknown as string).then((groups) => {
      // (dispatch as unknown as Function) fetching stattus to true
      (dispatch as unknown as Function)({
        type: updateFetchingGroupsCreatedStatus,
        payload: { status: false },
      });
      (dispatch as unknown as Function)({
        type: fetchGroupsCreated,
        payload: { groupsCreated: groups },
      });
    });
    // .catch((err: ErrorEvent) => {});
  }, [dispatch, userId]);
  return (
    <div className="form-container mt-10 w-full p-4 bg-white rounded-md">
      <form className="">
        <div className="form-group flex mb-8 items-end">
          <label htmlFor="email" className="font-semibold mr-4">
            Name of group to manage:
          </label>
          <select
            className=" border-0 border-b border-solid border-blue-400  flex-auto outline-none  px-3"
            id="group_name"
            placeholder="eg. Robot Gurus"
            onChange={(e) => setChoosen(e.target.value)}
          >
            <option selected disabled>
              Select a group
            </option>
            {!fetchingGroupsCreatedStatus &&
              groupsCreated?.map((group: IGroup) => (
                <option
                  key={group.id}
                  value={group.id}
                  selected={choosen === group.id}
                >
                  {group.name}
                </option>
              ))}
          </select>
        </div>

        <Button
          content="Manage Group"
          handleClick={() => handleSubmit(choosen)}
        />
      </form>
    </div>
  );
};

export default ManageGroupForm;
