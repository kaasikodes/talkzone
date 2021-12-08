import React, { useContext } from "react";
import { FiEdit2 } from "react-icons/fi";
import { UserContext } from "../contexts/UserContextProvider";

interface Iprops {
  setComponentName: Function;
}

const SideBarHeading = (props: Iprops) => {
  const { setComponentName } = props;
  const UserCtx = useContext(UserContext);
  const currentUser = UserCtx?.state;
  const light = "#fff";
  return (
    <div className="flex w-full justify-between py-2.5  pl-4 pr-2 border-solid border-blue-100 border-b">
      <div className="identity-section">
        <h1 className="logo mb-0.5 text-2xl font-bold">Talk2Much</h1>
        <h4 className="user-name font-semibold flex justify-start items-center">
          <div className="mr-1 w-4 h-4 rounded-full bg-red-500"></div>
          {currentUser?.name}
        </h4>
      </div>

      <div className="bg-blue-900 w-8 h-8 rounded-full self-center flex justify-center items-center">
        <FiEdit2
          style={{ fontSize: "1.2rem", color: `${light}` }}
          onClick={() => (setComponentName as unknown as Function)("edit user")}
        />
      </div>
    </div>
  );
};

export default SideBarHeading;
