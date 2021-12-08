import ChiImg from "../images/wom.jpg";
import Button from "./Button";
import { FaEdit } from "react-icons/fa";
import { UserContext, initUser } from "../contexts/UserContextProvider";
import { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../fbconfig";
import { OverlayContext } from "../contexts/OverlayContextProvider";

const EditUserDetails = () => {
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const dispatch = UserCtx?.dispatch;
  const OverCtx = useContext(OverlayContext);
  const handleCompName = OverCtx?.handleCompName;
  const [name, setName] = useState(user?.name);
  const [status, setStatus] = useState(false);
  const handleSubmit = async () => {
    const docRef = doc(db, "users", user?.id as unknown as string);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      displayName: name,
      status,
    });
    (dispatch as unknown as Function)({
      type: initUser,
      data: { ...user, name, status },
    });
    setStatus(false);
    setName("");

    (handleCompName as unknown as Function)("");
  };
  return (
    <div className=" flex items-center bg-white  mt-4 rounded-lg w-100 shadow-lg">
      <div className="w-full overflow-hidden flex rounded-lg px-4">
        <div
          className="flex justify-center items-center"
          style={{
            flex: 2,
            position: "relative",
          }}
        >
          <div
            className="imgContainer"
            style={{
              borderRadius: "100%",
              width: "300px",
              height: "300px",
              overflow: "hidden",
            }}
          >
            <img
              src={ChiImg}
              alt="creator"
              className=""
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                zIndex: 1,
              }}
            />
            <FaEdit
              className="text-yellow-400 shadow-md"
              style={{
                position: "absolute",
                zIndex: 2,

                fontSize: "2.8rem",
                top: "290px",
                left: "238px",
              }}
            />
          </div>
        </div>

        <div
          className="overflow-auto h-96 w-full  contentContainer ml-6 mr-4"
          style={{ flex: 3 }}
        >
          <h4 className="text-3xl text-yellow-400 mt-8 mb-4 capitalize">
            Change your details
          </h4>

          <form className="mt-8 w-full">
            <div className="form-group flex mb-8 flex-col ">
              <label htmlFor="user_name" className="font-semibold mr-4 mb-4">
                User Name:
              </label>
              <input
                type="text"
                className=" border-0 border-b border-solid border-blue-400  flex-auto outline-none  px-3"
                id="user_name"
                name="user_name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Your display name"
              />
            </div>
            <div className="form-group flex flex-col mb-8 ">
              <label htmlFor="password" className="font-semibold mr-4 mb-4">
                Status(I'm available):
              </label>
              <input
                type="radio"
                className=" border-0 border-b border-solid border-blue-400  flex-auto outline-none  px-3"
                id="status"
                name="status"
                checked={status}
                onChange={() => {
                  setStatus(!status);
                }}
              />
            </div>

            <Button content="Save" handleClick={handleSubmit} />
          </form>

          {/* STEPS TO BE TAKEN */}
          {/* user image */}
          {/* change password */}
          {/* A user name */}
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;
