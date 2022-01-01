import React from "react";

const Button: React.FC<{
  content: string;
  handleClick: Function;
  color?: string;
  type?: "submit" | "reset";
}> = ({ content, handleClick, color, type }) => {
  return (
    <>
      <button
        style={{ backgroundColor: color }}
        type={type}
        className="py-2 px-4 text-center rounded-md bg-blue-400 text-white cursor-pointer hover:bg-blue-700 transition duration-100 ease-in capitalize outline-none"
        onClick={() => handleClick()}
      >
        {content}
      </button>
    </>
  );
};

export default Button;
