import React, { useContext } from "react";
import ChiImg from "../images/wom.jpg";
import { GroupsContext } from "../contexts/GroupsContextProvider";
const GroupInfo = () => {
  const GroupsCtx = useContext(GroupsContext);
  const GroupsState = GroupsCtx?.state;
  const group = GroupsState?.currentGroupInfo;
  return (
    <div className=" flex items-center bg-white mt-4 rounded-lg w-100 shadow-lg">
      <div className="w-full overflow-hidden flex rounded-lg">
        <div className="imgContainer" style={{ flex: 2 }}>
          <img
            src={ChiImg}
            alt="creator"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>

        <div
          className="overflow-auto h-72 w-full  contentContainer ml-6 mr-6"
          style={{ flex: 3 }}
        >
          <h4 className="text-4xl  font-semibold text-blue-900 mt-2 mb-4 capitalize">
            {group?.name}
          </h4>
          <p>{group?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
