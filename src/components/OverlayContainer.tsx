import React, { useContext } from "react";
import { OverlayContext } from "../contexts/OverlayContextProvider";
import MobileMenu from "./MobileMenu";
import ConversationStarter from "./ConversationStarter";
import CreateFormGroup from "./CreateGroupForm";
import JoinGroupForm from "./JoinGroupForm";
import ManageGroupForm from "./ManageGroupForm";
import Notifications from "./Notifications";
import ShoutoutCreator from "./ShoutoutCreator";
import EditUserDetails from "./EditUserDetails";
import ConfirmLeaveGroup from "./ConfirmLeaveGroup";
import ManageGroup from "./ManageGroup";
import GroupInfo from "./GroupInfo";

const OverlayContainer = () => {
  const OverlayCtx = useContext(OverlayContext);
  const componentName = OverlayCtx?.componentName;
  const setComponentName = OverlayCtx?.handleCompName;

  function displayRightComponent() {
    switch (componentName) {
      case "mobile menu":
        return (
          <div
            className="bg-white"
            style={{ zIndex: 52, pointerEvents: "auto", width: "max-content" }}
          >
            <MobileMenu />
          </div>
        );

      case "conversation starter":
        return (
          <div
            className="bg-white mx-auto mt-10"
            style={{ zIndex: 52, pointerEvents: "auto", width: "max-content" }}
          >
            <ConversationStarter />
          </div>
        );

      case "create group form":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "max-content" }}
          >
            <CreateFormGroup />
          </div>
        );
      case "join group":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "max-content" }}
          >
            <JoinGroupForm />
          </div>
        );
      case "manage groups":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "max-content" }}
          >
            <ManageGroupForm />
          </div>
        );
      case "notifications":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "max-content" }}
          >
            <Notifications />
          </div>
        );
      case "shoutout creator":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "60%" }}
          >
            <ShoutoutCreator />
          </div>
        );
      case "group info":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "60%" }}
          >
            <GroupInfo />
          </div>
        );
      case "edit user":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "60%" }}
          >
            <EditUserDetails />
          </div>
        );
      case "manage group":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "60%" }}
          >
            <ManageGroup />
          </div>
        );
      case "leave group":
        return (
          <div
            className=" mx-auto"
            style={{ zIndex: 52, pointerEvents: "auto", width: "max-content" }}
          >
            <ConfirmLeaveGroup />
          </div>
        );

      default:
        return null;
    }
  }
  return (
    <>
      {componentName?.length !== 0 && (
        <div>
          <div
            className="overlay fixed bg-black w-full"
            onClick={() => {
              (setComponentName as unknown as Function)("");
            }}
            style={{
              opacity: 0.9,
              height: "100vh",
              width: "100vw",
              zIndex: 51,
            }}
          ></div>
          <div
            className="click-to-close fixed w-full"
            style={{
              height: "100vh",
              width: "100vw",
              zIndex: 52,
              pointerEvents: "none",
            }}
          >
            {displayRightComponent()}
          </div>
        </div>
      )}
    </>
  );
};

export default OverlayContainer;
