import React, { useState, useRef } from "react";
import Button from "./Button";

import { useUser } from "../contexts/UserContextProvider";

import NoImg from "../images/wom.jpg";
import { addGroupToServer } from "../utilities/groupsUtility";
import { FaEdit, FaTimes, FaUserCheck } from "react-icons/fa";
import Feedback from "./Feedback";

const CreateGroupForm = () => {
  const { user } = useUser();

  const userId = user?.id;
  const [photoUrl, setPhotoUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputClick = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
      console.log();
    }
  };

  const [group, setGroup] = useState({
    name: "",
    description: "",
  });
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroup((group) => ({ ...group, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = !!selectedFile ? selectedFile[0] : null;
    !!file && console.log(file);
    await addGroupToServer(
      userId as unknown as string,
      group,
      file,
      setProgress,
      setPhotoUrl
    );
    setShowFeedback(true);
    setGroup({ name: "", description: "" });
  };

  const [showFeedback, setShowFeedback] = useState(false);

  const closeFeedback = () => {
    setShowFeedback(false);
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
          className="overflow-auto  w-full disable-scrollbar mt-8 md:mt-0 contentContainer ml-4 mr-4"
          style={{ flex: 3 }}
        >
          {showFeedback && (
            <Feedback
              success
              message={`You successfully created ${group.name}`}
              handleClose={closeFeedback}
            />
          )}

          <h4 className="text-3xl text-yellow-400 mt-8 mb-4 capitalize">
            Create group
          </h4>

          <div className="mt-8 w-full">
            <div className="form-group flex mb-8 flex-col ">
              <label htmlFor="name" className="font-semibold mr-4 mb-4">
                Name:
              </label>
              <input
                type="text"
                className=" border-0 border-b border-solid border-blue-400  flex-auto outline-none  px-3"
                id="name"
                name="name"
                value={group.name}
                onChange={handleOnChange}
                placeholder="Group display name"
              />
            </div>
            <div className="form-group flex flex-col mb-8 ">
              <label htmlFor="description" className="font-semibold mb-2">
                description:
              </label>
              <textarea
                className=" border border-solid border-blue-400  flex-auto outline-none  px-3"
                id="description"
                name="description"
                value={group.description}
                onChange={handleOnChange}
                placeholder="Descibe the purpose of the group"
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

export default CreateGroupForm;
