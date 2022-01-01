import React from "react";
interface AvatarProps {
  image?: string | null;
  name?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image, name }) => {
  const firstLetter = name && name[0];
  return (
    <div className="bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center overflow-hidden bg-blue-500">
      {(image as unknown as string)?.length > 0 ? (
        <img
          src={image as unknown as string}
          alt={`${name}`}
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <span className="uppercase font-bold text-white text-lg">
          {firstLetter}
        </span>
      )}
    </div>
  );
};

export default Avatar;
