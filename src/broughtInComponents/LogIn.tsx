import { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../fbconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import Button from "../components/Button";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
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
      <motion.div
        className="authform w-full login_form"
        initial={{ x: "-200" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", ease: "easeOut" }}
      >
        <small className="auth_error">{errorMessage}</small>
        <form className="mb-3">
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
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <Button content="Log In" handleClick={handleSubmit} />
        </form>

        {/* <a href="/" target="_blank" className="lost_password">
          Lost your Password?
        </a> */}
      </motion.div>
    </>
  );
};

export default LogIn;
