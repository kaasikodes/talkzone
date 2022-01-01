import React from "react";
import { FaTimes, FaUserCheck } from "react-icons/fa";
interface IProps {
  message: string;
  success: boolean;
  handleClose: Function;
}

const Feedback = ({ message, success, handleClose }: IProps) => {
  return (
    <div className="flex w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-center w-12 bg-green-500 text-white">
        <FaUserCheck />
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className="font-semibold text-emerald-500 dark:text-emerald-400">
            {success ? "Success" : "Error"}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-200">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-center w-12 ml-auto ">
        <FaTimes onClick={() => handleClose()} />
      </div>
    </div>
  );
};

export default Feedback;
