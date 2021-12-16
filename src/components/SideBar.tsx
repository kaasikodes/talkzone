import React, { useContext } from "react";
import CurrentConversations from "../components/CurrentConversations";
import SideBarHeading from "../components/SideBarHeading";
import UserActionItems from "../components/UserActionItems";
import { OverlayContext } from "../contexts/OverlayContextProvider";
const SideBar = () => {
  const light = "#fff";
  const OverlayCtx = useContext(OverlayContext);
  const handleCompName = OverlayCtx?.handleCompName;
  return (
    <div
      className="side-bar bg-yellow-400 w-1/5 relative"
      style={{ color: `${light}` }}
    >
      <div className="fixed w-1/5">
        <div className="relative w-full">
          {/* heading */}
          <SideBarHeading
            setComponentName={handleCompName as unknown as Function}
          />

          {/* Action Items - 1 */}
          <UserActionItems
            setComponentName={handleCompName as unknown as Function}
          />
          {/* Actions Items - 2 */}
          <CurrentConversations />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
