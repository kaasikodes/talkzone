import EntityInfo from "./EntityInfo";
import { Link } from "react-router-dom";
import {
  hashConversationId,
  doesConversationExists,
  createConversation,
} from "../utilities/conversationsUtility";

import { useUser } from "../contexts/UserContextProvider";
import {
  useCurrentConversation,
  setCurrentConversation,
} from "../contexts/ConversationsContextProvider";
import { useState, useEffect } from "react";
import { getGroupsJoinedFromServer } from "../utilities/groupsUtility";

import { getPersonsFromServer } from "../utilities/personsUtility";
import { IConvo, IGroup, IPerson } from "../interfaces";
import { addConversationtoUserConversations } from "../utilities/userUtility";

const ConversationStarter = () => {
  // TO DO - CREATE A ROUTES CONsTANT FOR ROUTES
  const { user } = useUser();
  const { dispatch } = useCurrentConversation();

  const handleClick = async (data: IConvo) => {
    if ((await doesConversationExists(data.id)) === false) {
      await createConversation(data.id);
    }

    user &&
      (await addConversationtoUserConversations(user?.id, {
        id: data.id,
        name: data.receiverName,
      }));

    dispatch &&
      dispatch({
        type: setCurrentConversation,
        payload: {
          ...data,
        },
      });
  };

  const [persons, setPersons] = useState<IPerson[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    getPersonsFromServer(user?.id as unknown as string).then((data) => {
      setPersons(() => data);
    });
    getGroupsJoinedFromServer(user?.id as unknown as string).then((data) => {
      setGroups(() => data);
    });
  }, []);

  return (
    <div className="w-full py-4 px-6 min-h-screen bg-white">
      <div className=" flex items-center justify-between pb-8">
        <div>
          <h2 className="text-gray-600 font-semibold text-2xl text-blue-900 opacity-80">
            Start a Conversation
          </h2>
        </div>
      </div>

      <div className="groups mb-12">
        <h6 className="text-gray-700 text-lg font-semibold mb-4">People</h6>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {persons.length > 0 &&
            persons.map((person) => (
              <Link
                className="flex flex-col items-center justify-center w-full max-w-lg mx-auto h-70"
                key={person.id}
                to={`/dashboard/conversations/${person.name}`}
                onClick={() =>
                  handleClick({
                    id: user ? hashConversationId(person.id, user.id) : "",
                    receiverId: person.id,
                    receiverName: person.name,
                    receiverImg: person.photo_url ? person.photo_url : "",
                  })
                }
              >
                <div className="w-32 h-32 xl:h-40 xl:h-40 rounded-full bg-blue-400 flex justify-center items-center">
                  {person.photo_url && person.photo_url.length > 0 ? (
                    <img
                      className="object-cover w-32 h-32   xl:h-40 xl:h-40 rounded-full"
                      src={person.photo_url}
                      alt={person.name}
                    />
                  ) : (
                    <span className="uppercase font-bold text-white text-4xl text-center">
                      {person.name[0]}
                    </span>
                  )}
                </div>
                <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                  {person.name}
                </h4>
              </Link>
            ))}
        </div>
      </div>
      <div className="persons mb-12">
        <h6 className="text-gray-700 text-lg font-semibold mb-4">Groups</h6>

        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {groups.length > 0 &&
            groups.map((group) => (
              <Link
                className="flex flex-col items-center justify-center w-full max-w-lg mx-auto h-70"
                key={group.id}
                to={`/dashboard/conversations/${group.name}`}
                onClick={() =>
                  handleClick({
                    id: group.id,
                    receiverId: group.id,
                    receiverName: group.name,
                    receiverImg: group.photo_url ? group.photo_url : "",
                  })
                }
              >
                <div className="w-32 h-32 xl:h-40 xl:h-40 rounded-full bg-blue-400 flex justify-center items-center">
                  {group.photo_url && group.photo_url.length > 0 ? (
                    <img
                      className="object-cover w-32 h-32   xl:h-40 xl:h-40 rounded-full"
                      src={group.photo_url}
                      alt={group.name}
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
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationStarter;
