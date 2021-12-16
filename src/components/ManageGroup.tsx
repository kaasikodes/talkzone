import React, { useState, useContext } from "react";
import ChiImg from "../images/wom.jpg";
import Button from "./Button";
import { FaEdit } from "react-icons/fa";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import { IGroup } from "../interfaces";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../fbconfig";
import { OverlayContext } from "../contexts/OverlayContextProvider";
import { fetchGroupsCreated } from "../reducers/groupsReducer";

const ManageGroup = () => {
  const GroupsCtx = useContext(GroupsContext);
  const state = GroupsCtx?.state;
  const dispatch = GroupsCtx?.dispatch;
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  const groupsCreated = state?.groupsCreated;
  const groupToManageId = state?.groupToManageId;
  const group = groupsCreated?.find(
    (group: IGroup) => group.id === groupToManageId
  );
  const [groupName, setGroupName] = useState(group?.name);

  const [groupDescription, setGroupDescription] = useState(group?.description);

  const handleSubmit = async (id: string) => {
    const docRef = doc(db, "groups", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      name: groupName,
      description: groupDescription,
    });

    const updatedGroupsCreated = groupsCreated?.map((group: IGroup) => {
      if (group.id === groupToManageId) {
        return {
          ...group,
          name: groupName,
          description: groupDescription,
        };
      }
      return group;
    });

    (dispatch as unknown as Function)({
      type: fetchGroupsCreated,
      payload: { groupsCreated: updatedGroupsCreated },
    });
    setGroupDescription("");
    setGroupName("");

    (handleCompName as unknown as Function)("");
  };
  return (
    <div className=" flex items-center bg-white  mt-4 rounded-lg w-100 shadow-lg">
      <div className="w-full overflow-hidden flex  flex-col lg:flex-row rounded-lg px-4 py-4 w-4/5">
        <div
          className="flex justify-center items-center"
          style={{
            flex: 2,
            position: "relative",
          }}
        >
          <div
            className="imgContainer"
            style={{
              borderRadius: "100%",
              width: "300px",
              height: "300px",
              overflow: "hidden",
            }}
          >
            <img
              src={ChiImg}
              alt="creator"
              className=""
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                zIndex: 1,
              }}
            />
            <FaEdit
              className="text-yellow-400 shadow-md"
              style={{
                position: "absolute",
                zIndex: 2,

                fontSize: "2.8rem",
                top: "290px",
                left: "238px",
              }}
            />
          </div>
        </div>

        <div
          className="overflow-auto h-96 w-full mt-8 md:mt-0 contentContainer ml-6 mr-6"
          style={{ flex: 3 }}
        >
          <h4 className="text-3xl text-yellow-400 mt-2 mb-4 capitalize">
            Manage Group
          </h4>

          <form className="mt-8">
            <div className="form-group flex mb-8 items-end">
              <label htmlFor="group_name" className="font-semibold mr-4">
                Group Name:
              </label>
              <input
                type="text"
                className=" border-0 border-b border-solid border-blue-400  flex-auto outline-none  px-3"
                id="group_name"
                name="group_name"
                placeholder="The name other users will see"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="form-group flex mb-8 flex-col">
              <label htmlFor="password" className="font-semibold mr-4 mb-2">
                Description:
              </label>
              <textarea
                className=" border border-solid border-blue-400  flex-auto outline-none  px-3 py-2 rounded-md"
                rows={3}
                // value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              >
                {groupDescription}
              </textarea>
            </div>
            {/* SET BTN TO DISABLED UNTIL A VALUE IS CHOOSEN , I.E. WHEN CHOOSEN !=== "" */}

            <Button
              content="Save"
              handleClick={() => handleSubmit(group?.id as unknown as string)}
            />
          </form>

          {/* STEPS TO BE TAKEN */}
          {/* user image */}
          {/* change password */}
          {/* A user name */}
        </div>
      </div>
    </div>
  );
};

export default ManageGroup;
