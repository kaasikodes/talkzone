import React, { useContext } from "react";
import { OverlayContext } from "../contexts/OverlayContextProvider";

import UserActionItems from "./UserActionItems";
import SideBarHeading from "./SideBarHeading";
import CurrentConversations from "./CurrentConversations";

const MobileMenu = () => {
  const light = "#fff";
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  return (
    <div
      className="side-bar bg-yellow-400"
      style={{
        color: `${light}`,
        zIndex: 52,
        opacity: 1,
        width: "80vw",
        height: "100vh",
      }}
    >
      {/* heading */}
      <SideBarHeading
        setComponentName={handleCompName as unknown as Function}
      />

      {/* Action Items - 1 */}
      <UserActionItems
        setComponentName={handleCompName as unknown as Function}
      />
      {/* Actions Items - 2 */}
    </div>
  );
};

export default MobileMenu;
