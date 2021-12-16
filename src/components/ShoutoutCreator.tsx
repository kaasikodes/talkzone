import React from "react";
import { FaGithub, FaLinkedin, FaWeebly } from "react-icons/fa";
import ChiImg from "../images/wom.jpg";

const ShoutoutCreator = () => {
  return (
    <div className=" flex items-center bg-white disable-scrollbar mt-4 rounded-lg w-100 shadow-lg">
      <div className="w-full disable-scrollbar flex flex-col lg:flex-row rounded-lg">
        <div className="imgContainer" style={{ flex: 3 }}>
          <img
            src={ChiImg}
            alt="creator"
            style={{ objectFit: "cover", flex: 1 }}
            className="lg:h-full lg:w-full h-40 w-full"
          />
        </div>

        <div
          className="overflow-scroll disable-scrollbar h-72 w-full contentContainer pl-6 pr-6 text-center lg:text-left "
          style={{ flex: 2 }}
        >
          <h4 className="text-4xl  font-semibold text-blue-900 mt-2 mb-4 capitalize ">
            Thank you for choosing Talkzone
          </h4>
          <p className="w-full">
            Hi, there my name is Isaac the creator of talk zone, and I would
            love for us to connect. Check out
            <a href="isaac" className="text-italic ml-3">
              isaacodeh.com
            </a>
            to take a look at more projects. Don't forget to say hi! Thank you.
          </p>
          <div className="links flex justify-center lg:justify-start text-2xl mt-4 text-blue-700">
            <FaWeebly className="mr-4" />
            <FaLinkedin className="mr-4" />
            <FaGithub className="mr-4" />
          </div>
          {/* a card with image on left */}
          {/* Bold thank you for choosing */}
          {/* links to github, phone */}
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCreator;
