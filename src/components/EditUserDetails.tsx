import NoImg from "../images/wom.jpg";

import Button from "./Button";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useUser, initUser } from "../contexts/UserContextProvider";
import React, { useState, useRef } from "react";
import { editUserInServer } from "../utilities/userUtility";

const EditUserDetails = () => {
  const { user, dispatch } = useUser();
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [photoUrl, setPhotoUrl] = useState(user?.photo_url);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputClick = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = !!selectedFile ? selectedFile[0] : null;
    !!file && console.log(file);

    await editUserInServer(
      name as unknown as string,
      bio as unknown as string,

      user?.id as unknown as string,
      file,
      setProgress,
      setPhotoUrl
    );

    (dispatch as unknown as Function)({
      type: initUser,
      payload: { ...user, name, bio, photo_url: photoUrl },
    });
    setBio("");
    setName("");
    setSelectedFile(null);
  };
  return (
    <div className=" flex items-center bg-white  my-4 mx-4 rounded-lg w-100 shadow-lg">
      <form
        className="w-full overflow-hidden flex disable-scrollbar flex-col lg:flex-row rounded-lg px-4 py-4"
        onSubmit={handleSubmit}
      >
        <div
          className="flex justify-center items-center flex-col"
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
              src={photoUrl !== "" ? photoUrl : NoImg}
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
              onClick={handleFileInputClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={(e) =>
                e.target.files && e.target.files.length > 0
                  ? setSelectedFile(() => e.target.files)
                  : null
              }
            />
          </div>

          <div className="h-6 w-full mb-2 mt-12">
            {progress > 0 && (
              <div className="flex justify-between items-center  h-full w-full">
                <p className=""> Progress {progress}%</p>
                <FaTimes onClick={() => setProgress(() => 0)} />
              </div>
            )}
          </div>
        </div>

        <div
          className="overflow-auto h-96 w-full disable-scrollbar mt-8 md:mt-0 contentContainer ml-4 mr-4"
          style={{ flex: 3 }}
        >
          <h4 className="text-3xl text-yellow-400 mt-8 mb-4 capitalize">
            Change your details
          </h4>

          <div className="mt-8 w-full">
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
              <label htmlFor="bio" className="font-semibold mb-2">
                Bio:
              </label>
              <textarea
                className=" border border-solid border-blue-400  flex-auto outline-none  px-3"
                id="bio"
                name="bio"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                placeholder="Descibe yourself"
              />
            </div>

            <Button
              content="Save"
              type="submit"
              handleClick={() => console.log("fix it")}
            />
          </div>

          {/* STEPS TO BE TAKEN */}
          {/* user image */}
          {/* change password */}
          {/* A user name */}
        </div>
      </form>
    </div>
  );
};

export default EditUserDetails;
