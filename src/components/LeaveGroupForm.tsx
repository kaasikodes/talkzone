import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import { persons } from "../data";
import EntityInfo from "./EntityInfo";
import { FaPlus, FaMinus } from "react-icons/fa";
import NoImg from "../images/wom.jpg";
import { useUser } from "../contexts/UserContextProvider";
import { IGroup } from "../interfaces";
import {
  getGroupsJoinedFromServer,
  removeUserFromGroup,
} from "../utilities/groupsUtility";
import { notifyMembersOfGroup } from "../utilities/notificationsUtility";
import Feedback from "./Feedback";

type groupId = string | number;

const LeaveGroupForm = () => {
  const { user } = useUser();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupsToLeave, setGroupsToLeave] = useState<groupId[]>([]);
  useEffect(() => {
    getGroupsJoinedFromServer(user?.id as unknown as string).then((data) => {
      setGroups(() => data);
    });
  }, []);
  const handleSelect = (id: groupId) => {
    if (groupsToLeave.indexOf(id) === -1) {
      setGroupsToLeave(groupsToLeave.concat(id));
    } else {
      setGroupsToLeave(groupsToLeave.filter((grpId) => id !== grpId));
    }
  };
  const handleSubmit = async () => {
    // join group(s)
    await Promise.all(
      groupsToLeave.map(
        (id) => user && removeUserFromGroup(id as unknown as string, user?.id)
      )
    );

    //notify members of group
    await Promise.all(
      groupsToLeave.map((groupIdSelected) => {
        const groupToNotify = groups.find(
          (group) => group.id === groupIdSelected
        );

        return (
          user &&
          groupToNotify &&
          notifyMembersOfGroup(groupToNotify, user, true)
        );
      })
    );

    setShowFeedback(true);
    setGroups((groups) => {
      return groups.filter(({ id }) => !groupsToLeave.includes(id));
    });
  };

  const [showFeedback, setShowFeedback] = useState(false);

  const closeFeedback = () => {
    setShowFeedback(false);
  };
  return (
    <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden min-h-screen bg-white">
      <main role="main" className="w-full h-full flex-grow p-8 overflow-auto">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold text-2xl text-blue-900 opacity-80">
              Leave Group
            </h2>
          </div>
        </div>
        {showFeedback && (
          <Feedback
            success
            message={`You successfully left ${groupsToLeave.length} groups`}
            handleClose={closeFeedback}
          />
        )}

        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-8 mx-auto">
            <div className="lg:flex lg:-mx-2">
              <div className="mt-6 lg:mt-0 lg:px-2  w-full ">
                <div className="flex items-center justify-between text-sm tracking-wider w-full">
                  <p className="text-gray-500 dark:text-gray-300 font-semibold w-50">
                    Select the groups you wish to leave
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        handleSubmit();
                      }}
                      className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                      Leave Group
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {groups.length > 0 &&
                    groups.map((group) => (
                      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto h-70">
                        <div
                          className="w-32 h-32 xl:h-40 xl:h-40 rounded-full bg-blue-400 flex justify-center items-center"
                          key={group.id}
                        >
                          {group.photo_url && group.photo_url.length > 0 ? (
                            <img
                              className="object-cover w-32 h-32   xl:h-40 xl:h-40 rounded-full"
                              src={group.photo_url}
                              alt={group.photo_url}
                            />
                          ) : (
                            <span className="uppercase font-bold text-white text-4xl text-center">
                              {group.name[0]}
                            </span>
                          )}
                        </div>
                        <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                          {group.name}
                        </h4>
                        <button
                          onClick={() => handleSelect(group.id)}
                          className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                          {!groupsToLeave.includes(group.id) ? (
                            <>
                              <FaPlus />
                              <span className="mx-1">Add group</span>
                            </>
                          ) : (
                            <>
                              <FaMinus />
                              <span className="mx-1">Remove group</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-8">
        <div className="sticky top-0 p-4 pt-36 w-full">
          <h4 className="text-lg text-gray-500 mb-4 font-semibold">
            Groups Selected
          </h4>
          <ul className="flex flex-col overflow-hidden content-center justify-between text-gray-600">
            {groupsToLeave.map((groupId) => (
              <li>
                <span>
                  {groups && groups?.find(({ id }) => id === groupId)?.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaveGroupForm;
