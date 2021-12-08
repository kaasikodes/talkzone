import React from "react";

const Button: React.FC<{
  content: string;
  handleClick: Function;
  color?: string;
}> = ({ content, handleClick, color }) => {
  return (
    <>
      <span
        style={{ backgroundColor: color }}
        className="py-2 px-4 rounded-md bg-blue-400 text-white cursor-pointer hover:bg-blue-700 transition duration-100 ease-in capitalize outline-none"
        onClick={() => handleClick()}
      >
        {content}
      </span>
    </>
  );
};

export default Button;
