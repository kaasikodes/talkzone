import React from "react";
import Avatar from "./Avatar";

interface Props {
  name: string;
  info?: string;
  photo_url?: string;
}

const EntityInfo: React.FC<Props> = ({ name, photo_url }) => {
  return (
    <div className="entityInfo flex flex-col items-center w-full text-center">
      <Avatar name={name} image={photo_url} />
      <h6 className="mt-1 text-blue-500">{name}</h6>
    </div>
  );
};

export default EntityInfo;
