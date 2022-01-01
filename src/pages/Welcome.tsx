import React from "react";

const Welcome = () => {
  return (
    <div className="w-full">
      <h4 className="text-4xl  font-semibold text-blue-900 mt-2 mb-4 capitalize ">
        Thank you for choosing Talkzone
      </h4>
      <p className="w-full">
        Hi, there my name is Isaac the creator of talk zone, and I would love
        for us to connect. Check out my
        <a
          href="http://www.bit.ly/isaac_odeh"
          className="text-italic mx-1 text-blue-700"
          target="_blank"
          rel="noreferrer"
        >
          portfolio
        </a>
        to take a look at more projects. Don't forget to say hi! Thank you.
      </p>
    </div>
  );
};

export default Welcome;
