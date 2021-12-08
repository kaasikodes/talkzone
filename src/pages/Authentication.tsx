import React from "react";
import AuthUI from "../broughtInComponents/AuthUI";

// try to implement in dashboard

const Authentication = () => {
  return (
    <div
      className="bg-yellow-400 flex justify-center items-center"
      style={{ width: "100vw", maxHeight: "1000vh", height: "100vh" }}
    >
      <AuthUI />
    </div>
  );
};

export default Authentication;
