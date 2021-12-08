import React from "react";
interface ActionProps {
  text: string;
  reverse?: boolean;
  color?: string;
  handleClick: Function;
}

const ActionItem: React.FC<ActionProps> = ({
  text,
  children,
  reverse,
  color,
  handleClick,
}) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } align-center mb-2 items-center    ${color ? color : ""}`}
      style={{ cursor: "pointer" }}
    >
      <div
        className={`${reverse ? "ml-2" : "mr-1"}`}
        style={{ fontSize: "1.2rem" }}
      >
        {children}
      </div>
      <p className="capitalize">{text}</p>
    </div>
  );
};

export default ActionItem;
