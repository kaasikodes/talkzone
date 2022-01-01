import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContextProvider";
import NoImg from "../images/wom.jpg";

const ViewProfile = () => {
  const { user } = useUser();
  const photoUrl = user?.photo_url;
  return (
    <div className=" flex items-center bg-white  my-4 mx-4 rounded-lg w-100 shadow-lg">
      <div className="w-full overflow-hidden flex disable-scrollbar flex-col lg:flex-row rounded-lg px-4 py-4">
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
          </div>
        </div>

        <div
          className="overflow-auto h-96 w-full disable-scrollbar mt-8 md:mt-0 contentContainer ml-4 mr-4"
          style={{ flex: 3 }}
        >
          <Link to="/dashboard/edit/user/" className="flex items-center">
            <span className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Edit
            </span>
          </Link>

          <div className="mt-8 w-full">
            <div
              className="div
        -group flex mb-8 flex-col "
            >
              <h4 className="text-3xl tracking-wider font-semibold">
                {user && user.name}
              </h4>
            </div>
            <div
              className="div
        -group flex flex-col mb-8 "
            >
              <p>{user && user.bio}</p>
            </div>
          </div>

          {/* STEPS TO BE TAKEN */}
          {/* user image */}
          {/* change password */}
          {/* A user name */}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
