import React, { useState, useContext } from "react";
import Button from "./Button";

import { UserContext } from "../contexts/UserContextProvider";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import { createGroup } from "../reducers/groupsReducer";
import { addGroupToServer } from "../utilities/groupsUtility";
import { OverlayContext } from "../contexts/OverlayContextProvider";

const CreateGroupForm = () => {
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  const userId = user?.id;
  const GroupsCtx = useContext(GroupsContext);
  const dispatch = GroupsCtx?.state;

  const [group, setGroup] = useState({
    name: "",
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((group) => ({ ...group, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {
    // add to db
    // if success disp create group
    // dismiss overlay
    addGroupToServer(userId as unknown as string, group)
      .then((group) => {
        (dispatch as unknown as Function)({
          type: createGroup,
          payload: { ...group },
        });
        // dismiss overalay
        (handleCompName as unknown as Function)("");
      })
      .catch((err) => {
        console.log("error while creating", err);
      });
  };
  return (
    <div className="form-container mt-10 w-full p-4 bg-white rounded-md">
      <form className="">
        <div className="form-group flex mb-8 items-end">
          <label htmlFor="email" className="font-semibold mr-4">
            Name of group:
          </label>
          <input
            type="text"
            className=" border-0 border-b border-solid border-blue-400  flex-auto outline-none  px-3"
            id="name"
            name="name"
            value={group.name}
            onChange={handleOnChange}
            placeholder="eg. Robot Gurus"
          />
        </div>

        <Button content="Create Group" handleClick={handleSubmit} />
      </form>
    </div>
  );
};

export default CreateGroupForm;
