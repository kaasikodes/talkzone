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

  const handleSubmit = () => {
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
      <motion.div
        className="authform w-full register_form"
        initial={{ x: "200" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", ease: "easeIn" }}
      >
        <small className="auth_error">{registerError}</small>
        <form className="">
          <div className="form-group flex mb-3">
            <label htmlFor="user_name" className="font-semibold capitalize">
              User name:
            </label>
            <input
              type="text"
              className="border border-b border-solid border-blue-400 rounded-md ml-3 flex-auto outline-none py-1 px-3"
              id="user_name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group flex mb-3">
            <label htmlFor="email" className="font-semibold capitalize">
              Email address:
            </label>
            <input
              type="email"
              className="border border-b border-solid border-blue-400 rounded-md ml-3 flex-auto outline-none py-1 px-3"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group flex mb-3">
            <label htmlFor="pwd" className="font-semibold capitalize">
              password:
            </label>
            <input
              type="password"
              className="border border-b border-solid border-blue-400 rounded-md ml-3 flex-auto outline-none py-1 px-3"
              id="password"
              onChange={(e) => setRegisterPwd(e.target.value)}
            />
          </div>
          <div className="form-group flex mb-3">
            <label htmlFor="confirm_pwd" className="font-semibold capitalize">
              Retype Password:
            </label>
            <input
              type="password"
              className="border border-b border-solid border-blue-400 rounded-md ml-3 flex-auto outline-none py-1 px-3"
              id="confirm_pwd"
              onChange={(e) => setConfirmRegisterPwd(e.target.value)}
            />
          </div>

          <Button content="sign up" handleClick={handleSubmit} />
        </form>
      </motion.div>
    </>
  );
};

export default SignUp;
