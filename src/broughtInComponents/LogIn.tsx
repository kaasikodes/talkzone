import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../fbconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import Button from "../components/Button";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // move to user Utility
    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCred) => {
        // Signed in
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.code);
      });
  };
  return (
    <>
      <div className="authform w-full login_form">
        <h2 className="text-center text-blue-900 mb-6 text-2xl font-semibold uppercase">
          Login
        </h2>
        <small className="auth_error">{errorMessage}</small>
        <form className="flex flex-col items-stretch" onSubmit={handleSubmit}>
          <div className="form-group flex flex-col mb-3">
            <label className="text-yellow-500 text-xs">Email</label>
            <input
              type="email"
              className="border-0 border-b border-blue-400 flex-auto outline-none py-1 px-3"
              id="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group flex flex-col mb-8">
            <label className="text-yellow-500 text-xs">Password</label>
            <input
              type="password"
              className="border-0 border-b border-blue-400 flex-auto outline-none py-1 px-3"
              id="password"
              placeholder="password"
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <Button
            content="Log In"
            handleClick={() => console.log("correct form mistake")}
          />
        </form>

        {/* <a href="/" target="_blank" className="lost_password">
          Lost your Password?
        </a> */}
      </div>
    </>
  );
};

export default LogIn;
