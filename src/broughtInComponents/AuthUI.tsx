import "./authUI.css";
import { useState } from "react";

import SignUp from "./SignUp";
import LogIn from "./LogIn";

const AuthUI = () => {
  const [showLogin, setShowLogin] = useState(true);

  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };
  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  return (
    <div
      className="authUI flex flex-col shadow-md bg-white rounded-md relative"
      style={{ top: "-5rem" }}
    >
      <div className="authNav w-full">
        <span
          className={`authNavItem ${showLogin && "active"}`}
          onClick={handleLoginClick}
        >
          Login
        </span>
        <span
          className={`authNavItem ${showRegister && "active"}`}
          onClick={handleRegisterClick}
        >
          Sign Up
        </span>
      </div>
      <div className="authForms w-full py-2 px-6">
        {showLogin && <LogIn />}

        {showRegister && <SignUp />}
      </div>
    </div>
  );
};

export default AuthUI;
