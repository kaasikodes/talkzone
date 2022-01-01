import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Button from "../components/Button";
import { auth, db } from "../fbconfig";

import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerPwd, setRegisterPwd] = useState("");
  const [email, setEmail] = useState("");

  const [confirmRegisterPwd, setConfirmRegisterPwd] = useState("");

  // ctx

  const verifyPassword = useCallback(() => {
    if (registerPwd !== confirmRegisterPwd) {
      setRegisterError(`Passwords don't match`);
      return false;
    } else {
      setRegisterError("");
      return true;
    }
  }, [confirmRegisterPwd, registerPwd]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TO DO - MOVE TO UTILITY
    if (verifyPassword()) {
      createUserWithEmailAndPassword(auth, email, registerPwd)
        .then((userCredential) => {
          const userId = userCredential.user.uid;
          // Signed in
          // add  essntl data to the users collection for user
          setDoc(doc(db, "users", userId), {
            displayName: name,
            photo_url: "",
            groups_part_of: [],
            groups_admin_of: [],
            conversations: [],
          })
            .then(() => {
              // no need handled in app tsx
              console.log("already handled in APPP");
            })
            .catch((err) => {
              console.log("err =>", err);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error=>", errorCode, errorMessage);
        });
    }
  };

  useEffect(() => {
    verifyPassword();
  }, [verifyPassword]);
  return (
    <>
      <div className="authform w-full register_form">
        <h2 className="text-center text-blue-900 mb-6 text-2xl font-semibold uppercase">
          Sign Up
        </h2>
        <small className="auth_error">{registerError}</small>
        <form className="flex flex-col items-stretch" onSubmit={handleSubmit}>
          <div className="form-group flex flex-col mb-3">
            <label className="text-yellow-500 text-xs">User Name</label>
            <input
              placeholder="user name"
              type="text"
              className="border-0 border-b border-blue-400 flex-auto outline-none py-1 px-3"
              id="user_name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form-group flex flex-col mb-3">
            <label className="text-yellow-500 text-xs">Password</label>
            <input
              type="password"
              className="border-0 border-b border-blue-400 flex-auto outline-none py-1 px-3"
              id="password"
              placeholder="password"
              onChange={(e) => setRegisterPwd(e.target.value)}
            />
          </div>
          <div className="form-group flex flex-col mb-8">
            <label className="text-yellow-500 text-xs">Confirm Password</label>
            <input
              type="password"
              className="border-0 border-b border-blue-400 flex-auto outline-none py-1 px-3"
              id="confirm_pwd"
              placeholder="confirm password"
              onChange={(e) => setConfirmRegisterPwd(e.target.value)}
            />
          </div>

          <Button
            content="sign up"
            handleClick={() => console.log("correct form mistake")}
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;
