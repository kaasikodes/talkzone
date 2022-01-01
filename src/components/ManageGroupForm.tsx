import React, { useState, useEffect } from "react";
import Button from "./Button";
import { persons } from "../data";
import EntityInfo from "./EntityInfo";
import { showSummary } from "../utilities/helpers";
import { IGroup } from "../interfaces";
import { useUser } from "../contexts/UserContextProvider";
import {
  getGroupsCreatedFromServer,
  deleteGroupFromServer,
} from "../utilities/groupsUtility";
import { Link } from "react-router-dom";

type groupId = string | number;

const ManageGroupForm = () => {
  const { user } = useUser();
  const [groups, setGroups] = useState<IGroup[]>([]);
  useEffect(() => {
    getGroupsCreatedFromServer(user?.id as unknown as string).then((data) => {
      setGroups(() => data);
    });
  }, []);
  const handleDeleteGroup = async (group: IGroup) => {
    console.log("MY GROUP IS", group);

    if (group.creatorId === user?.id) {
      const idToDelete = group.id;
      await deleteGroupFromServer(idToDelete);

      setGroups((groups) => groups.filter((group) => group.id !== idToDelete));
    } else {
      throw new Error("action not allowed!");
    }
  };
  return (
    <div className="bg-white p-8  w-full min-h-screen">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold text-2xl text-blue-900 opacity-80">
            Manage Group
          </h2>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {groups.length > 0 &&
                  groups.map((group) => (
                    <tr key={group.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {group.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {showSummary(
                            group.description ? group.description : ""
                          )}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          to={`/dashboard/view/group/${group.id}`}
                          className="relative outline-none inline-block px-3 py-1 font-semibold text-white leading-tight"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-blue-700  rounded-full"
                          ></span>
                          <span className="relative">View</span>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          to={`/dashboard/edit/group/${group.id}`}
                          className="relative outline-none inline-block px-3 py-1 font-semibold text-white leading-tight"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-600  rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleDeleteGroup(group)}
                          className="relative outline-none inline-block px-3 py-1 font-semibold text-white leading-tight"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-red-600  rounded-full"
                          ></span>
                          <span className="relative">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between   displ       ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGroupForm;
